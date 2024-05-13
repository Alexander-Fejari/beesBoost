import express, { Router } from 'express';
import MailerController from '../controllers/mailer.controller';

const router: Router = express.Router();
const mailerController = new MailerController();

router.get(`/test`, (req, res) => mailerController.sendConfirmationEmail(`clementlequenne1@gmail.com`, `Clément`, `1425`));

export default router;