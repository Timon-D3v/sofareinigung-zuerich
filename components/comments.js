import mysql from "mysql2";
import { errorLog } from "timonjs";
import CONFIG from "../config.js";



const pool = mysql.createPool({
    host: CONFIG.MYSQL.HOST,
    user: CONFIG.MYSQL.USER,
    password: CONFIG.MYSQL.PASSWORD,
    database: CONFIG.MYSQL.DATABASE
}).promise();



export async function getComments() {
    try {
        const [result] = await pool.query("SELECT * FROM `comments`;");
        return result;
    } catch (error) {
        errorLog(error);
        return [];
    }
};

export async function saveComment(object, url) {
    try {
        const [result] = await pool.query("SELECT * FROM `comments` WHERE `email` = ?;", [object.email]);
        
        const query = result.length > 0 ?
            "UPDATE `comments` SET `name` = ?, `family_name` = ?, `email` = ?, `review` = ?, `image` = ?, `rating` = ?, `date` = ? WHERE `email` = ?;":
            "INSERT INTO `comments` (`name`, `family_name`, `email`, `review`, `image`, `rating`, `date`) VALUES (?, ?, ?, ?, ?, ?, ?);";

        await pool.query(
            query,
            [object.name, object.familyName, object.email, object.message, url, Number(object.rating), new Date().toISOString().split("T")[0], object.email]
        );

        return true;
    } catch (error) {
        errorLog(error);
        return false;
    }
}



export default {
    getComments,
    saveComment
}