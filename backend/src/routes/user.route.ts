import express, { Router } from 'express';
import UserController from '../controllers/user.controller';

const router: Router = express.Router();
const userController = new UserController();

// POST


router.post(`/addUser`, (req, res) => userController.addUser(req, res)); // Swagger à faire

// GET


router.get(`/getAllUsers`, (req, res) => userController.getAllUsers(req, res)); // Swagger à faire

router.get(`/getUser/:param`, (req, res) => userController.getUser(req, res)); // Swagger à faire

// router.get(`/getAllStudens`, (req, res) => userController.getAllStudens(req, res)); // Swagger à faire

// router.get(`/getAllWorkers`, (req, res) => userController.getAllWorkers(req, res)); // Swagger à faire

// DELETE


router.delete(`/deleteUser`, (req, res) => userController.deleteUser(req, res)); // Swagger à faire + Ajouter Protection : admin/superAdmin 

// PUT


router.put(`/updateInfo/:param`, (req, res) => userController.updateFields(req, res, [`profile_pic`, `email`, `lastname`, `firstname`, `occupation`, `location`, `contact_info`])); // Swagger à faire

router.put(`/updateVerified/:param`, (req, res) => userController.updateField(req, res, `is_verified`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin

router.put(`/updateActive/:param`, (req, res) => userController.updateField(req, res, `is_active`)); // Swagger à faire

router.put(`/updateConnected/:param`, (req, res) => userController.updateField(req, res, `is_connected`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin

router.put(`/updateUsername/:param`, (req, res) => userController.updateField(req, res, `username`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin + pas nécéssaire a priori sauf si l'admin doit pouvoir le changer dans la verif

router.put(`/updatePassword/:param`, (req, res) => userController.updateField(req, res, `password`));// Swagger à faire

router.put(`/updateWorkerIsAdmin/:param`, (req, res) => userController.updateWorkerIsAdmin(req, res));// Swagger à faire

router.put(`/updateStudentDetails/:param`, (req, res) => userController.updateStudentDetails(req, res));

export default router;