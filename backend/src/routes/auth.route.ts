import express, { Router } from 'express';
import authController from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.post(`/signIn`, (req, res) => authController.userLogin(req, res));

router.post(`/renewToken`, /*authenticateToken,*/ (req, res) => authController.renewToken(req, res));

router.post(`/logOut/:param`, authenticateToken, (req, res) => authController.logOut(req, res));

router.post(`/requestPasswordReset`, authController.requestPasswordReset); // Swagger à faire

router.post(`/resetPassword/:token`, authController.resetPassword); // Swagger à faire

export default router;