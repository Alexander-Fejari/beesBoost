import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router: Router = express.Router();
const authController = new AuthController();

router.post(`/signIn`, (req, res) => authController.userLogin(req, res));

router.post(`/renewToken`, /*authenticateToken,*/ (req, res) => authController.renewToken(req, res));

router.post(`/logOut/:param`, authenticateToken, (req, res) => authController.logOut(req, res));

router.post(`/requestPasswordReset`, authController.requestPasswordReset);

router.post(`/resetPassword/:token`, authController.resetPassword);

export default router;