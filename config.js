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
    },



    // Should come from database:
    EMAIL: "info@sofareinigung-zuerich.ch",
    EMAIL_PERSONAL: "info@sofareinigung-zuerich.ch",
    PHONE: "+41788858196",
    LINKS: {
        INSTAGRAM: "https://www.instagram.com/sofareinigung_zuerich/",
        FACEBOOK: "https://www.facebook.com/Sofareinigung-Z%C3%BCrich-101102745662073",
        WHATSAPP: "https://wa.me/41788858196",
    }
};