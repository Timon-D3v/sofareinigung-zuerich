import express from "express";
import CONFIG from "../config.js";
import verify from "../components/verify.auth.js";



// Router serves under /auth
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login.ejs", {
        CONFIG,
        url: req.url,
        origin: req.protocol + "://" + req.get("host"),
        title: CONFIG.PAGES.LOGIN.TITLE,
        description: CONFIG.PAGES.LOGIN.DESCRIPTION
    });
});

router.post("/submit", verify, (req, res) => {
    res.json({
        success: true,
        message: "Login successful!"
    });
});



export default router;