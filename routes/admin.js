import express from "express";
import { CONFIG, updateConfig } from "../config.js";
import get from "../components/get.database.js";
import { getComments } from "../components/comments.js";



// Router serves under /admin and is secured with the auth middleware
const router = express.Router();

router.get("/", async (req, res) => {
    await updateConfig();

    const comments = await getComments();

    res.render("admin.ejs", {
        CONFIG,
        url: req.url,
        origin: req.protocol + "://" + req.get("host"),
        title: CONFIG.PAGES.ADMIN.TITLE,
        description: CONFIG.PAGES.ADMIN.DESCRIPTION,
        comments,
        compare: typeof CONFIG.COMPARE === "string" ? JSON.parse(CONFIG.COMPARE) : CONFIG.COMPARE,
        text: typeof CONFIG.TEXT === "string" ? JSON.parse(CONFIG.TEXT) : CONFIG.TEXT,
        infoBanner: typeof CONFIG.INFO_BANNER === "string" ? JSON.parse(CONFIG.INFO_BANNER) : CONFIG.INFO_BANNER
    });
});



export default router;