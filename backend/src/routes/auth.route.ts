import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router: Router = express.Router();
const authController = new AuthController();

router.post(`/signUp`, (req, res) => authController.addUser(req, res)); // Swagger à faire

router.post(`/signIn`, (req, res) => authController.userLogin(req, res)); // Swagger à faire

router.post(`/renewToken`, (req, res) => authController.renewToken(req, res)); // Swagger à faire

export default router;