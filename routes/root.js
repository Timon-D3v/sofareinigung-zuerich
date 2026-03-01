import CONFIG from "../config.js";
import express from "express";
import { getComments } from "../components/comments.js";
import get from "../components/get.database.js";



// Router serves under the root path
const router = express.Router();

router.get("/", async (req, res) => {
    const compare = await get("before_after");
    const text = await get("text");
    const infoBanner = await get("info_banner");
    
    let COMMENTS = await getComments();

    if (COMMENTS.length < 10) {
        COMMENTS = [];
    } else if (COMMENTS.length > 100) {
        COMMENTS = COMMENTS.filter((_, index) => index > COMMENTS.length - 101);
    }

    res.render("index.ejs", {
        CONFIG,
        url: req.url,
        origin: req.protocol + "://" + req.get("host"),
        title: CONFIG.PAGES.HOME.TITLE,
        description: CONFIG.PAGES.HOME.DESCRIPTION,
        comments: COMMENTS,
        compare: JSON.parse(compare),
        text: JSON.parse(text),
        infoBanner: JSON.parse(infoBanner)
    });
});

export default router;