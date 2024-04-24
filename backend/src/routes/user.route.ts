import express, { Router } from 'express';
import UserController from '../controllers/user.controller';

const router: Router = express.Router();

router.post('/', UserController.addUser);
router.get('/', UserController.getUsers);

export default router;
