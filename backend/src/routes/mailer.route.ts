import express, { Router } from 'express';
import mailerService from '../services/mailer.service';

const router: Router = express.Router();

router.get(`/test`, (req, res) => mailerService.sendConfirmationEmail(`clementlequenne1@gmail.com`, `Clément`, `1425`));

export default router;