import pool from "./pool.database.js";
import { errorLog } from "timonjs";

export default async function get(name) {
    if (typeof name !== "string") return null;

    try {
        const [result] = await pool.query("SELECT * FROM `zaki`.`options` WHERE `name` = ?;", [name]);
        return result[0].value;
    } catch (error) {
        errorLog(error);
        return null;
    }
}