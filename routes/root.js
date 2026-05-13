import { CONFIG, updateConfig } from "../config.js";
import express from "express";
import { getComments } from "../components/comments.js";
import get from "../components/get.database.js";



// Router serves under the root path
const router = express.Router();

router.get("/", async (req, res) => {
    await updateConfig();

    let comments = await getComments();

    if (comments.length < 10) {
        comments = [];
    } else if (comments.length > 100) {
        comments = comments.filter((_, index) => index > comments.length - 101);
    }

    res.render("index.ejs", {
        CONFIG,
        url: req.url,
        origin: req.protocol + "://" + req.get("host"),
        title: CONFIG.PAGES.HOME.TITLE,
        description: CONFIG.PAGES.HOME.DESCRIPTION,
        comments,
        compare: typeof CONFIG.COMPARE === "string" ? JSON.parse(CONFIG.COMPARE) : CONFIG.COMPARE,
        text: typeof CONFIG.TEXT === "string" ? JSON.parse(CONFIG.TEXT) : CONFIG.TEXT,
        infoBanner: typeof CONFIG.INFO_BANNER === "string" ? JSON.parse(CONFIG.INFO_BANNER) : CONFIG.INFO_BANNER
    });
});

export default router;