import dotenv from "dotenv";
import mysql from "mysql2";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";


dotenv.config({
    path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env")
});



export default mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT
}).promise();