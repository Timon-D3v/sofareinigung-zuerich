import bcrypt from "bcrypt";
import update from "./update.database.js";
import { errorLog } from "timonjs";


export default async function updatePassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const result = await update("password", hash);

        return result;
    } catch (error) {
        errorLog(error);
        return false;
    }
}