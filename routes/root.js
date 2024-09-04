import CONFIG from "../config.js";
import express from "express";

// Router serves under the root path
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.ejs", {
        CONFIG,
        url: req.url,
        origin: req.protocol + "://" + req.get("host"),
        title: "Home",
        description: "Welcome to the site!"
    });
});

export default router;