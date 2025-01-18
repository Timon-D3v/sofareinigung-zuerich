import CONFIG from "../config.js";
import email from "./email.js";


/**
 * Class representing a contact email.
 */
export class ContactEmail {
    /**
     * Create a contact email.
     * @param {string} name - The first name of the contact.
     * @param {string} familyName - The family name of the contact.
     * @param {string} email - The email address of the contact.
     * @param {string} message - The message from the contact.
     * @param {Array} files - The files attached to the email.
     */
    constructor(name, familyName, email, message, files, postalCode) {
        this.inputs = {
            name,
            familyName,
            email,
            message,
            files,
            postalCode
        };

        this.date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
        this.message_end = `\n\nGeschrieben von ${this.inputs.name} ${this.inputs.familyName} am ${this.date}.\n${this.inputs.name} hat die Postleitzahl ${this.inputs.postalCode} und du kannst ihn/sie unter ${this.inputs.email} erreichen.`;

        this.template = {
            TEXT: `${CONFIG.TEMPLATES.EMAIL.CONTACT.TITLE}\n\n${this.inputs.message}\n\n${CONFIG.TEMPLATES.EMAIL.CONTACT.MESSAGE_END}\n\n${CONFIG.TEMPLATES.EMAIL.CONTACT.FOOTER}\n${CONFIG.TEMPLATES.EMAIL.CONTACT.FOOTER_2}`,
            HTML: `<div style="background:#f5f5f5">
  <div style="background-color:#f5f5f5;padding-top:80px">
    <div style="margin:0 auto;max-width:600px;background:#ffffff">
      <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;border-top:3px solid ${CONFIG.TEMPLATES.EMAIL.GLOBAL.COLOR}" align="center" border="0">
        <tbody>
          <tr>
            <td style="text-align:center;vertical-align:top;font-size:0px;padding:40px 30px 30px 30px">
              <div style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%">
                <table cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="word-break:break-word;font-size:0px;padding:0px;padding-bottom:30px" align="center">
                        <div style="color:#55575d;font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;line-height:22px">${CONFIG.TEMPLATES.EMAIL.CONTACT.TITLE}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="word-break:break-word;font-size:0px;padding:0px;padding-bottom:35px" align="center">
                        <div style="color:#8c8c8c;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:22px">
                        </div>
                      </td>
                    </tr>                    
                    <tr>
                      <td style="word-break:break-word;font-size:0px;padding:0px" align="center">
                        <div style="font-family:Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:22px">
                          <p style="font-size:12px;line-height:18px;color:#8c8c8c;">
                            <big style="font:15px Arial,Helvetica,sans-serif;padding:10px;background:#ffffff;border:1px solid #e3e3e3;text-align:left;color:#555555;display:block;">
                              <b>${this.inputs.message.replace(/\n/g, "<br>")}</b>
                            </big>
                            <br>
                            ${CONFIG.TEMPLATES.EMAIL.CONTACT.MESSAGE_END}
                            <br>
                            ${this.message_end}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin:0 auto;max-width:600px">
      <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%" align="center" border="0">
        <tbody>
          <tr>
            <td style="text-align:center;vertical-align:top;font-size:0px;padding:30px">
              <div style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%">
                <table cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="word-break:break-word;font-size:0px;padding:0px;padding-bottom:10px" align="center">
                        <div style="color:#8c8c8c;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:22px">
                          <span>${CONFIG.TEMPLATES.EMAIL.CONTACT.FOOTER}</span>
                          <span>${CONFIG.TEMPLATES.EMAIL.CONTACT.FOOTER_2}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="word-break:break-word;font-size:0px;padding:0px;padding-bottom:15px" align="center">
                        <div style="color:#8c8c8c;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:22px">${CONFIG.TEMPLATES.EMAIL.GLOBAL.COPY}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="word-break:break-word;font-size:0px;padding:0px" align="center">
                        <div style="color:#8c8c8c;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:22px">
                          <!--<a href="${CONFIG.LINKS.INSTAGRAM}" style="text-decoration:none;color:inherit;padding:0 4px" target="_blank">
                            <img alt="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.INSTAGRAM.ALT}" src="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.INSTAGRAM.SRC}" style="border:none;outline:none;text-decoration:none;height:28px;width:28px" width="28" height="28">
                          </a>
                          <a href="${CONFIG.LINKS.FACEBOOK}" style="text-decoration:none;color:inherit;padding:0 4px" target="_blank">
                            <img alt="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.FACEBOOK.ALT}" src="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.FACEBOOK.SRC}" style="border:none;outline:none;text-decoration:none;height:28px;width:28px" width="28" height="28">
                          </a>-->
                          <a href="${CONFIG.LINKS.WHATSAPP}" style="text-decoration:none;color:inherit;padding:0 4px" target="_blank">
                            <img alt="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.WHATSAPP.ALT}" src="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.WHATSAPP.SRC}" style="border:none;outline:none;text-decoration:none;height:28px;width:28px" width="28" height="28">
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`
        }
    }
    /**
     * Send the contact email.
     * @returns {Promise} A promise that resolves when the email is sent.
     */
    async send() {
        return await email.sendMail(
            CONFIG.EMAIL_PERSONAL,
            CONFIG.EMAIL,
            `${this.inputs.name} ${this.inputs.familyName}`,
            CONFIG.TEMPLATES.EMAIL.CONTACT.TITLE + ` von ${this.inputs.name} ${this.inputs.familyName}`,
            this.template.TEXT,
            this.template.HTML,
            this.inputs.files,
            CONFIG.TEMPLATES.EMAIL.CONTACT.TITLE
        );
    }
}

/**
 * Class representing a comments validation email.
 */
export class CommentsValidationEmail {
  constructor(email, code) {
      this.inputs = {
          email,
          code
      };

      this.template = {
          TEXT: `${CONFIG.TEMPLATES.EMAIL.COMMENTS.TITLE}\n\n${this.inputs.code}\n\n${CONFIG.TEMPLATES.EMAIL.COMMENTS.MESSAGE_HINT}\n\n${CONFIG.TEMPLATES.EMAIL.COMMENTS.FOOTER}`,
          HTML: `<div style="background:#f5f5f5">
<div style="background-color:#f5f5f5;padding-top:80px">
  <div style="margin:0 auto;max-width:600px;background:#ffffff">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;border-top:3px solid ${CONFIG.TEMPLATES.EMAIL.GLOBAL.COLOR};border-radius:5px" align="center" border="0">
      <tbody>
        <tr>
          <td style="word-break:break-word;font-size:0px;padding:0px;padding-bottom:30px" align="center">
            <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px" align="center" border="0">
              <tbody>
                <tr>
                  <td style="width:180px">
                    <a href="" target="_blank">
                      <img alt="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.LOGO.ALT}" title="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.LOGO.ALT}" height="180" src="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.LOGO.SRC}" style="border:none;display:block;outline:none;text-decoration:none;width:180px;height:180px" width="180">
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="text-align:center;vertical-align:top;font-size:0px;padding:40px 30px 30px 30px">
            <div style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%">
              <table cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="word-break:break-word;font-size:0px;padding:0px;padding-bottom:30px" align="center">
                      <div style="color:#55575d;font-family:Open Sans,Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;line-height:22px">${CONFIG.TEMPLATES.EMAIL.COMMENTS.TITLE}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="word-break:break-word;font-size:0px;padding:0px;padding-bottom:35px" align="center">
                      <div style="color:#8c8c8c;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:22px">
                      </div>
                    </td>
                  </tr>                    
                  <tr>
                    <td style="word-break:break-word;font-size:0px;padding:0px" align="center">
                      <div style="font-family:Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:22px">
                        <p style="font-size:12px;line-height:18px;color:#8c8c8c;">
                          <big style="font:15px Arial,Helvetica,sans-serif;padding:10px;background:#ffffff;border:1px solid #e3e3e3;text-align:center;color:#555555;display:block;">
                            <b>${this.inputs.code}</b>
                          </big>
                          <br>
                          ${CONFIG.TEMPLATES.EMAIL.COMMENTS.MESSAGE_HINT}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="margin:0 auto;max-width:600px">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%" align="center" border="0">
      <tbody>
        <tr>
          <td style="text-align:center;vertical-align:top;font-size:0px;padding:30px">
            <div style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%">
              <table cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td style="word-break:break-word;font-size:0px;padding:0px;padding-bottom:10px" align="center">
                      <div style="color:#8c8c8c;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:22px">
                        <span>${CONFIG.TEMPLATES.EMAIL.COMMENTS.FOOTER}</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="word-break:break-word;font-size:0px;padding:0px;padding-bottom:15px" align="center">
                      <div style="color:#8c8c8c;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:22px">${CONFIG.TEMPLATES.EMAIL.GLOBAL.COPY}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="word-break:break-word;font-size:0px;padding:0px" align="center">
                      <div style="color:#8c8c8c;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:22px">
                        <!--<a href="${CONFIG.LINKS.INSTAGRAM}" style="text-decoration:none;color:inherit;padding:0 4px" target="_blank">
                          <img alt="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.INSTAGRAM.ALT}" src="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.INSTAGRAM.SRC}" style="border:none;outline:none;text-decoration:none;height:28px;width:28px" width="28" height="28">
                        </a>
                        <a href="${CONFIG.LINKS.FACEBOOK}" style="text-decoration:none;color:inherit;padding:0 4px" target="_blank">
                          <img alt="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.FACEBOOK.ALT}" src="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.FACEBOOK.SRC}" style="border:none;outline:none;text-decoration:none;height:28px;width:28px" width="28" height="28">
                        </a>-->
                        <a href="${CONFIG.LINKS.WHATSAPP}" style="text-decoration:none;color:inherit;padding:0 4px" target="_blank">
                          <img alt="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.WHATSAPP.ALT}" src="${CONFIG.TEMPLATES.EMAIL.GLOBAL.IMG.WHATSAPP.SRC}" style="border:none;outline:none;text-decoration:none;height:28px;width:28px" width="28" height="28">
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>`
      }
  }
  /**
   * Send the comments validation email.
   * @returns {Promise} A promise that resolves when the email is sent.
   */
  async send() {
      return await email.sendMail(this.inputs.email, CONFIG.EMAIL, CONFIG.NAME, "Dein Bestätigungscode", this.template.TEXT, this.template.HTML, [], "Kommentar Bestätigungscode");
  }
}




export default {
    ContactEmail,
    CommentsValidationEmail
}