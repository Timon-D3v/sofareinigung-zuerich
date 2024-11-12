import express from "express";
import CONFIG from "../config.js";
import get from "../components/get.database.js";
import { getComments } from "../components/comments.js";



// Router serves under /admin and is secured with the auth middleware
const router = express.Router();

router.get("/", async (req, res) => {
    const comments = await getComments();
    const text = await get("text");
    const compare = await get("before_after");

    res.render("admin.ejs", {
        CONFIG,
        url: req.url,
        origin: req.protocol + "://" + req.get("host"),
        title: CONFIG.PAGES.ADMIN.TITLE,
        description: CONFIG.PAGES.ADMIN.DESCRIPTION,
        comments,
        compare: JSON.parse(compare),
        text: JSON.parse(text)
    });
});



export default router;