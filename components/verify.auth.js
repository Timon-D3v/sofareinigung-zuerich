import get from "./get.database.js";
import bcrypt from "bcrypt";

export default async function verify(req, res, next) {

    if (typeof req.body.username !== "string" || typeof req.body.password !== "string") {
        return res.status(400).json({
            success: false,
            message: "Bad Request"
        });
    }

    const { username, password } = req.body;
    const data = {
        username: await get("username"),
        password: await get("password")
    }

    if (!data) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

    const compare = await bcrypt.compare(password, data.password);

    if (data.username === username && compare) {
        req.session.auth = true;
        req.session.username = username;

        return next();
    }

    return res.status(401).json({
        success: false,
        message: "Unauthorized"
    });
}