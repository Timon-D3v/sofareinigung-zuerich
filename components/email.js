import Mailjet from "node-mailjet";
import timon from "timonjs";
import CONFIG from "../config.js";



const mailjet = new Mailjet({
    apiKey: CONFIG.MAILJET.PUBLIC_KEY,
    apiSecret: CONFIG.MAILJET.PRIVATE_KEY
});



/**
 * Sends an email using the Mailjet API.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} from - The sender's email address.
 * @param {string} name - The sender's name.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email.
 * @param {string} html - The HTML content of the email.
 * @param {Array} [files=[]] - An array of file attachments.
 * @param {string} [id=timon.randomString(16)] - A custom ID for the email.
 * @returns {Promise<Object>} A promise that resolves to an object indicating the success status and response data.
 */
export async function sendMail(to, from, name, subject, text, html, files = [], id = timon.randomString(16)) {
    try {
        const response = await mailjet.post("send", {version: "v3.1"}).request({
            Messages: [{
                From: {
                    Email: from,
                    Name: name
                },
                To: [{
                    Email: to
                }],
                Subject: subject,
                TextPart: text,
                HTMLPart: html,
                CustomID: id,
                Attachments: files
            }]
        });
        return {
            success: true,
            data: response
        };
    } catch (error) {
        timon.errorLog(error);
        return {
            success: false,
            data: response
        };
    }
}



export default {
    sendMail
};