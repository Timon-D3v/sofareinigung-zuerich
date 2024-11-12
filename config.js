// Import
import dotenv from "dotenv";
import get from "./components/get.database.js";

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
    EMAIL: await get("email"),
    EMAIL_PERSONAL: await get("email_personal"),
    PHONE: await get("phone"),
    LINKS: {
        INSTAGRAM: await get("link_instagram"),
        FACEBOOK: await get("link_facebook"),
        WHATSAPP: await get("link_whatsapp")
    },
    PROD_ORIGIN: process.env.ORIGIN,
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
    MYSQL: {
        HOST: process.env.MYSQL_HOST,
        USER: process.env.MYSQL_USER,
        PASSWORD: process.env.MYSQL_PW,
        DATABASE: process.env.MYSQL_DB
    },
    MAILJET: {
        PUBLIC_KEY: process.env.MAILJET_PUBLIC_KEY,
        PRIVATE_KEY: process.env.MAILJET_PRIVATE_KEY
    },
    IMAGEKIT: {
        PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
        PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
        URL_ENDPOINT: "https://ik.imagekit.io/sofareinigungzuerich/"
    },
    PAGES: {
        HOME: {
            TITLE: "Home",
            DESCRIPTION: "Sofareinigung Zürich ist Ihr professioneller Partner für die Reinigung von Polstermöbeln in Zürich und Umgebung."
        },
        ADMIN: {
            TITLE: "Verwaltung",
            DESCRIPTION: "Das ist die Verwaltungsoberfläche von Sofareinigung Zürich."
        },
        LOGIN: {
            TITLE: "Login",
            DESCRIPTION: "Bitte logge dich ein, um auf die Verwaltungsoberfläche von Sofareinigung Zürich zuzugreifen."
        }
    },
    TEMPLATES: {
        EMAIL: {
            GLOBAL: {
                COLOR: "#2046df",
                COPY: `&copy; 2024 Sofareinigung Zürich | info@sofareinigung-zuerich.ch`,
                IMG: {
                    LOGO: {
                        ALT: "Sofareinigung Zürich Logo",
                        SRC: "https://ik.imagekit.io/sofareinigungzuerich/email/footer/logo.png"
                    },
                    INSTAGRAM: {
                        ALT: "Instagram Logo",
                        SRC: "https://ik.imagekit.io/sofareinigungzuerich/email/footer/instagram.png"
                    },
                    FACEBOOK: {
                        ALT: "Facebook Logo",
                        SRC: "https://ik.imagekit.io/sofareinigungzuerich/email/footer/facebook.png"
                    },
                    WHATSAPP: {
                        ALT: "WhatsApp Logo",
                        SRC: "https://ik.imagekit.io/sofareinigungzuerich/email/footer/whatsapp.png"
                    }
                }
            },
            CONTACT: {
                TITLE: "Nachricht über Kontaktformular",
                MESSAGE_END: "Diese Nachricht wurde über das Webseitenformular von <a href=\"https://sofareinigung-zuerich.ch\" style=\"color:#8c8c8c;\">sofareinigung-zuerich.ch</a> versendet.",
                FOOTER: "Der Ersteller (Timon Fiedler) ist nicht verantwortlich für eventuellen Spam oder missbrauch jeglicher Art, welche durch den Endnutzer entstehen.",
                FOOTER_2: "Bitte lass es mich wissen, wenn du denkst, dass dir diese E-Mail nicht zugestellt hätte werden sollen."
            },
            COMMENTS: {
                TITLE: "Dein Bestätigungscode lautet:",
                MESSAGE_HINT: "Dieser Code ist nur 30min gültig.",
                FOOTER: "Falls du nicht versucht hast einen Kommentar auf <a href=\"https://sofareinigung-zuerich.ch\" style=\"color:#8c8c8c;\">sofareinigung-zuerich.ch</a> zu hinterlassen, kannst du diese E-Mail einfach ignorieren oder dich unter info@sofareinigung-zuerich.ch melden."
            }
        }
    }
};