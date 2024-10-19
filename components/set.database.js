import pool from "./pool.database.js";
import { errorLog } from "timonjs";

export default async function set(name, value) {
    if (typeof name !== "string" || typeof value !== "string") return false;

    try {
        await pool.query("INSERT INTO `zaki`.`options` (`name`, `value`) VALUES (?, ?)", [name, value]);
    } catch (error) {
        errorLog(error);
        return false;
    }
    
    return true;
}