import express, { Router } from 'express';
import UserController from '../controllers/user.controller';

const router: Router = express.Router();
const userController = new UserController();

router.get('/getAllUsers', (req, res) => userController.getAllUsers(req, res));

router.get('/getUser/:username', (req, res) => userController.getUser(req, res));

router.post('/addUser', (req, res) => userController.addUser(req, res));

export default router;