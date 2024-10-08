import nodemailer from 'nodemailer';
// import express, { Router } from 'express';
// import mailerService from '../services/mailer.service';

// const router: Router = express.Router();

// router.get(`/test`, (req, res) => mailerService.sendConfirmationEmail(`clementlequenne1@gmail.com`, `Clément`, `1425`));

// export default router;

class MailerService {
  protected async initMailer(): Promise<any> {
    const transporter = nodemailer.createTransport({
      host: "smtp-auth.mailprotect.be",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    return transporter;
  }

  async sendConfirmationEmail(userEmail: string, userName: string, confirmationCode: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Confirmation de votre compte',
      html: `<h1>Email de Confirmation</h1>
          <h2>Hello ${userName}</h2>
          <p>Merci pour votre inscription. Veuillez confirmer votre email en cliquant sur le lien suivant</p>
          <a href=${process.env.DOMAIN_EMAIL}/user/confirmEmail/${confirmationCode}> Click here to confirm your account</a><br><br>
          <a href=${process.env.DOMAIN_EMAIL}/user/resendConfirmationEmail/${userEmail}>Send a new confirmation token</a>
          </div>`,
    };
  
    try {
      const transporter = await this.initMailer();
      await transporter.sendMail(mailOptions);
    } 
    catch (error) {
      console.error("Erreur lors de l'envoi de l'email", error);
    }
  }

  async resendConfirmationEmail(userEmail: string, userName: string, confirmationCode: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Nouveau lien de confirmation à votre compte',
      html: `<h1>Email de Confirmation</h1>
          <h2>Hello ${userName}</h2>
          <p>Merci pour votre inscription. Veuillez confirmer votre email en cliquant sur ce nouveau lien</p>
          <a href=${process.env.DOMAIN_EMAIL}/user/confirmEmail/${confirmationCode}> Click here</a><br><br>
          <a href=${process.env.DOMAIN_EMAIL}/user/resendConfirmationEmail/${userEmail}>Send a new confirmation token</a>
          </div>`,
    };
  
    try {
      const transporter = await this.initMailer();
      await transporter.sendMail(mailOptions);
    } 
    catch (error) {
      console.error("Erreur lors de l'envoi de l'email", error);
    }
  }

  async sendPasswordResetEmail(userEmail: string, userName: string, resetToken: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Réinitialisation de votre mot de passe',
      html: `<h1>Réinitialisation du Mot de Passe</h1>
             <h2>Hello ${userName}</h2>
             <p>Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe :</p>
             <a href="${process.env.DOMAIN_EMAIL}/auth/resetPassword/${resetToken}">Réinitialiser le mot de passe</a>`
    };
    try {
      const transporter = await this.initMailer();
      await transporter.sendMail(mailOptions);
    } 
    catch (error) {
      console.error("Erreur lors de l'envoi de l'email", error);
    }
  }
}

export default new MailerService;