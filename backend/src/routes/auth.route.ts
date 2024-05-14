import express, { Router } from 'express';
import authController from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.post(`/signIn`, (req, res) => authController.userLogin(req, res));

router.post(`/renewToken`, (req, res) => authController.renewToken(req, res));

router.post(`/logOut/:param`, authenticateToken, (req, res) => authController.logOut(req, res));

export default router;