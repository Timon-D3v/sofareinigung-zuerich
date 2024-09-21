import CONFIG from "../config.js";
import express from "express";
import { getComments } from "../components/comments.js";
import COMPARE from "../components/test.compare.js";

// Router serves under the root path
const router = express.Router();

let COMMENTS = await getComments();

if (COMMENTS.length > 100) {
    COMMENTS = COMMENTS.filter((_, index) => index > COMMENTS.length - 101);
}

router.get("/", async (req, res) => {
    res.render("index.ejs", {
        CONFIG,
        url: req.url,
        origin: req.protocol + "://" + req.get("host"),
        title: CONFIG.PAGES.HOME.TITLE,
        description: CONFIG.PAGES.HOME.DESCRIPTION,
        comments: COMMENTS,
        compare: COMPARE
    });
});

export default router;