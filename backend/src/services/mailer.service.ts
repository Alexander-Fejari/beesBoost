import nodemailer from 'nodemailer';

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
          <a href=http://localhost:5000/user/confirmEmail/${confirmationCode}> Click here</a>
          </div>`,
    };
  
    try {
      const transporter = await this.initMailer();
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email", error);
    }
  }
}

export default new MailerService;