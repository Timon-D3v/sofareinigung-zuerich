import pool from "./pool.database.js";
import { errorLog } from "timonjs";



export default async function deleteId(id) {
    if (typeof id !== "number") return false;

    try {
        await pool.query("DELETE FROM `zaki`.`comments` WHERE (`id` = ?);", [id]);
    } catch (error) {
        errorLog(error);
        return false;
    }
    
    return true;
}