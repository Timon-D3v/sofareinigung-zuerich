import pool from "./pool.database.js";
import { errorLog } from "timonjs";

export default async function update(name, value) {
    if (typeof name !== "string" || typeof value !== "string") return false;

    try {
        await pool.query("UPDATE `zaki`.`options` SET `value` = ? WHERE `name` = ?;", [value, name]);
    } catch (error) {
        errorLog(error);
        return false;
    }
    
    return true;
}