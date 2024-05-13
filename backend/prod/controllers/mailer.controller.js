"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailerController {
    async initMailer() {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp-auth.mailprotect.be",
            port: 465,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "clementlequenne@beesboost.com",
                pass: "BeesBoost2023",
            },
        });
        return transporter;
    }
    async sendConfirmationEmail(userEmail, userName, confirmationCode) {
        const mailOptions = {
            from: 'clementlequenne@beesboost.com',
            to: userEmail,
            subject: 'Confirmation de votre compte',
            html: `<h1>Email de Confirmation</h1>
          <h2>Hello ${userName}</h2>
          <p>Merci pour votre inscription. Veuillez confirmer votre email en cliquant sur le lien suivant</p>
          <a href=http://localhost:5000/confirm/${confirmationCode}> Click here</a>
          </div>`,
        };
        try {
            const transporter = await this.initMailer();
            await transporter.sendMail(mailOptions);
            console.log("Email de confirmation envoyé");
        }
        catch (error) {
            console.error("Erreur lors de l'envoi de l'email", error);
        }
    }
}
exports.default = MailerController;
