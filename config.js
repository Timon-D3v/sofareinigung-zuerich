// Import
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Export the constants
export default {
    NAME: "Sofareinigung Zürich",
    NAME_HTML: "Sofareinigung<br>Zürich",
    LOGO_PATH: "/img/logo.ico",
    LOGO_MIMETYPE: "image/ico",
    LOGO_SHARE_PATH: "/img/logo.png",
    LOGO_SHARE_MIMETYPE: "image/png",
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,



    // Should come from database:
    PHONE: "+41788858196",
    LINKS: {
        INSTAGRAM: "https://www.instagram.com/sofareinigung_zuerich/",
        FACEBOOK: "https://www.facebook.com/Sofareinigung-Z%C3%BCrich-101102745662073",
        WHATSAPP: "https://wa.me/41788858196",
    }
};