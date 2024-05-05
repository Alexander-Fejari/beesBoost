import express, { Router } from 'express';
import UserController from '../../controllers/user/user.controller';
import { UserModel } from '../../models/user/user.model';

const router: Router = express.Router();
const userController = new UserController();

// POST


router.post(`/addUser`, (req, res) => userController.addUser(req, res, UserModel)); // Swagger à faire

// GET


router.get(`/getAllUsers`, (req, res) => userController.getAllUsers(req, res, UserModel)); // Swagger à faire

router.get(`/getUser/:param`, (req, res) => userController.getUser(req, res, UserModel)); // Swagger à faire

// DELETE


router.delete(`/deleteUser`, (req, res) => userController.deleteUser(req, res, UserModel)); // Swagger à faire + Ajouter Protection : admin/superAdmin 

// PUT


router.put(`/updateUserInfo/:param`, (req, res) => userController.updateFields(req, res, UserModel, [`password`, `profile_pic`, `email`, `lastname`, `firstname`, `occupation`, `location`, `contact_info`])); // Swagger à faire

router.put(`/updateUserVerified/:param`, (req, res) => userController.updateField(req, res, UserModel, `is_verified`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin

router.put(`/updateUserActive/:param`, (req, res) => userController.updateField(req, res, UserModel, `is_active`)); // Swagger à faire

router.put(`/updateUserConnected/:param`, (req, res) => userController.updateField(req, res, UserModel, `is_connected`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin

router.put(`/updateUserUsername/:param`, (req, res) => userController.updateField(req, res, UserModel, `username`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin + pas nécéssaire a priori sauf si l'admin doit pouvoir le changer dans la verif

export default router;