import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import AuthController from '../controllers/auth.controller';

const router: Router = express.Router();

const userController = new UserController();
const authController = new AuthController();


router.post('/signup', (req, res) => userController.addUser(req, res));

router.post('/login', (req, res) => authController.login(req, res));


export default router