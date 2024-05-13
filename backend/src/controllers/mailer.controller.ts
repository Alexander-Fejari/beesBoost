import nodemailer from 'nodemailer';

class MailerController {
  protected async initMailer(): Promise<any> {
    const transporter = nodemailer.createTransport({
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

  async sendConfirmationEmail(userEmail: string, userName: string, confirmationCode: string) {
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
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email", error);
    }
  }
}

export default MailerController;