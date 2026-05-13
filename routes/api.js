import express from "express";
import timon, { errorLog } from "timonjs";
import CONFIG from "../config.js";
import auth from "../components/auth.js";
import multerInstance from "../components/multer.js";
import { delivApiUpload } from "delivapi-client";
import updatePassword from "../components/password.update.auth.js";
import { ContactEmail, CommentsValidationEmail } from "../components/email.templates.js";
import { getRandomInt } from "../components/functions.js";
import { saveComment } from "../components/comments.js";
import update from "../components/update.database.js";
import deleteId from "../components/delete.database.js";
import get from "../components/get.database.js";



// Router serves under /api
const router = express.Router();

const commentsValidation = [];

router.post("/contact", async (req, res) => {
    try {
        const { name, familyName, email, message, files, postalCode } = req.body;

        if (!name || !familyName || !email || !message || !files || !postalCode) return res.status(400).json({ error: "Bitte fülle alle Felder aus." });

        if (!Array.isArray(files) || files.length === 0) return res.status(400).json({ error: "Bitte lade mindestens ein Bild hoch." });

        for (const file of files) {
            if (!file.name || !file.base64) return res.status(400).json({ error: "Du kannst nur gültige Daten schicken." });
        }

        const base64Array = files.map(file => ({
            ContentType: file.base64.split(";")[0].replace(/data:/, ""),
            Filename: file.name,
            Base64Content: file.base64.split(",")[1]
        }));
        
        const response = await new ContactEmail(name, familyName, email, message, base64Array, postalCode).send();

        if (response.success) return res.status(200).json({ error: "OK" });

        throw new Error(response.data);
    } catch (error) {
        timon.errorLog(error);

        res.status(500).json({ error: "Etwas hat nicht geklappt. Bitte versuche es später erneut." });
    }
});

router.post("/comments", multerInstance.single("file"), async (req, res) => {    
    try {
        const file = req?.file
        const { name, familyName, email, message, rating } = req.body;

        if (!name || !familyName || !email || !message || !file || !rating) return res.status(400).json({ error: "Bitte fülle alle Felder aus." });

        if (Number(rating) === NaN || Number(rating) > 5) return res.status(400).json({ error: "Bitte gib eine gültige Bewertung an." });

        for (let i = 0; i < commentsValidation.length; i++) {
            if (commentsValidation[i].email === email) {
                commentsValidation.splice(i, 1);
                req.session.commentsValidation = null;
            }
        }

        let code = "";

        for (let i = 0; i < 6; i++) {
            code += getRandomInt(0, 9).toString();
        }

        const response = await new CommentsValidationEmail(email, code).send();

        if (!response.success) throw new Error(response.data);

        commentsValidation.push({ name, familyName, email, message, file, rating, code });
        req.session.commentsValidation = { email, code };

        setTimeout(() => {
            for (let i = 0; i < commentsValidation.length; i++) {
                if (commentsValidation[i].email === email) {
                    commentsValidation.splice(i, 1);
                    req.session.commentsValidation = null;
                    return;
                }
            }
        }, 1800000 /* 30min */);

        res.status(200).json({ error: "OK" });
    } catch (error) {
        timon.errorLog(error);
        res.status(500).json({ error: "Etwas hat nicht geklappt. Bitte versuche es später erneut." });
    }
});

router.post("/commentsConfirm", async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) return res.status(400).json({ error: "Bitte fülle alle Felder aus." });

        const { email } = req.session.commentsValidation;

        if (!email) return res.status(400).json({ error: "Du hast keine offene Kommentaranfrage." });

        for (let i = 0; i < commentsValidation.length; i++) {
            if (commentsValidation[i].email === email && commentsValidation[i].code === code) {
                let result = false;

                if (typeof commentsValidation[i].file === "string") {
                    result = saveComment(commentsValidation[i], "/img/user.svg");
                } else {
                    const response = await delivApiUpload(commentsValidation[i].file.buffer)

                    result = !response.error

                    if (!response.error) {
                        result = saveComment(commentsValidation[i], response.url);
                    } else {
                        timon.warnLog("Image upload failed.");
                        result = saveComment(commentsValidation[i], "/img/user.svg");
                    }
                }

                if (!result) return res.status(500).json({ error: "Der Code war richtig, aber etwas hat bei uns nicht geklappt. Bitte versuche es später erneut." });

                commentsValidation.splice(i, 1);
                req.session.commentsValidation = null;

                return res.status(200).json({ error: "OK" });
            }
        }

        res.status(400).json({ error: "Der Bestätigungscode ist falsch." });
    } catch (error) {
        timon.errorLog(error); 
        res.status(500).json({ error: "Etwas hat nicht geklappt. Bitte versuche es später erneut." });
    }
});

router.get("/phone", async (req, res) => {
    try {
        res.status(200).send(await get("phone"));
    } catch (error) {
        timon.errorLog(error);
        res.status(500).send("Etwas hat nicht geklappt. Bitte versuche es später erneut.");
    }
});

router.post("/setPassword", auth, async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) throw new Error("Please fill out all fields.");

        const valid = await updatePassword(password);

        if (!valid) throw new Error("An error occurred while setting the password.");

        res.json({
            valid,
            message: "Password set successfully"
        });
    } catch (error) {
        timon.errorLog(error);
        res.status(500).json({
            valid: false,
            message: "An error occurred while setting the password."
        });
    }
});

router.post("/changeDB", auth, async (req, res) => {
    try {
        const { name, value } = req.body;

        if (!name || !value) throw new Error("Please fill out all fields.");

        const valid = await update(name, value);

        if (!valid) throw new Error("An error occurred while changing the database.");

        res.json({
            valid,
            message: "Database changed successfully."
        });
    } catch (error) {
        timon.errorLog(error);
        res.status(500).json({
            valid: false,
            message: "An error occurred while changing the database."
        });
    }
});

router.post("/deleteComment", auth, async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) throw new Error("Please fill out all fields.");

        const valid = await deleteId(Number(id));

        if (!valid) throw new Error("An error occurred while deleting the comment.");

        res.json({
            valid,
            message: "Comment deleted successfully."
        });
    } catch (error) {
        timon.errorLog(error);
        res.status(500).json({
            valid: false,
            message: "An error occurred while deleting the comment."
        });
    }
});

router.post("/uploadCarousel", auth, multerInstance.array("files", 2), async (req, res) => {
    try {
        const filesArray = req.files;

        if (!filesArray || !Array.isArray(filesArray)) throw new Error("Please fill out all fields.");

        const beforeImageResponse = await delivApiUpload(filesArray[0].buffer);
        const afterImageResponse = await delivApiUpload(filesArray[1].buffer);

        if (beforeImageResponse.error || afterImageResponse.error) throw new Error("An error occurred while uploading the images.");

        const carouselItem = [beforeImageResponse.url, afterImageResponse.url];

        const currentCarousel = JSON.parse(await get("before_after"));

        currentCarousel.push(carouselItem);

        const success = await update("before_after", JSON.stringify(currentCarousel));

        if (!success) throw new Error("An error occurred while uploading the carousel.");

        res.json({
            success,
            message: "Carousel uploaded successfully.",
            urls: carouselItem
        });
    } catch (error) {
        timon.errorLog(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while uploading the carousel.",
            urls: null
        });
    }
});



export default router;