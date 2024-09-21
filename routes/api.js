import express from "express";
import timon from "timonjs";
import CONFIG from "../config.js";
import uploadImage from "../components/imagekit.js";
import { ContactEmail, CommentsValidationEmail } from "../components/email.templates.js";
import { getRandomInt } from "../components/functions.js";
import { saveComment } from "../components/comments.js";



// Router serves under /api
const router = express.Router();

const commentsValidation = [];

router.post("/contact", async (req, res) => {
    try {
        const { name, familyName, email, message, files } = req.body;

        if (!name || !familyName || !email || !message || !files) return res.status(400).json({ error: "Bitte fülle alle Felder aus." });

        if (!Array.isArray(files) || files.length === 0) return res.status(400).json({ error: "Bitte lade mindestens ein Bild hoch." });

        for (const file of files) {
            if (!file.name || !file.base64) return res.status(400).json({ error: "Du kannst nur gültige Daten schicken." });
        }

        const base64Array = files.map(file => ({
            ContentType: file.base64.split(";")[0].replace(/data:/, ""),
            Filename: file.name,
            Base64Content: file.base64.split(",")[1]
        }));
        
        const response = await new ContactEmail(name, familyName, email, message, base64Array).send();

        if (response.success) return res.status(200).json({ error: "OK" });

        throw new Error(response.data);
    } catch (error) {
        timon.errorLog(error);

        res.status(500).json({ error: "Etwas hat nicht geklappt. Bitte versuche es später erneut." });
    }
});

router.post("/comments", async (req, res) => {    
    try {
        const { name, familyName, email, message, file, rating } = req.body;

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
                const response = await uploadImage(commentsValidation[i].file, timon.randomString(16), "users");

                let url = "/img/user.svg";

                if (response === null) timon.warnLog("Image upload failed.");
                else url = response.url;

                const result = saveComment(commentsValidation[i], url);

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



export default router;