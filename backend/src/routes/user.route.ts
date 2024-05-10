import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware'

const router: Router = express.Router();
const userController = new UserController();

// POST


router.post(`/signUp`, (req, res) => userController.addUser(req, res));
// GET


router.get(`/getAllUsers`, /*authenticateToken,*/ (req, res) => userController.getAllUsers(req, res));

router.get(`/getUser/:param`, /*authenticateToken,*/ (req, res) => userController.getUser(req, res));

router.get(`/getAllStudents`, /*authenticateToken,*/ (req, res) => userController.getAllStudents(req, res)); // Swagger à faire

//router.get(`/getAllWorkers`, (req, res) => userController.getAllSW(req, res, `worker`)); // Swagger à faire

router.get(`/getLastRegisteredStudents`, /*authenticateToken,*/ (req, res) => userController.getLastStudents(req, res, 5));

// DELETE


router.delete(`/deleteUser`, /*authenticateToken, authorizeRoles(`superAdmin`),*/ (req, res) => userController.deleteUser(req, res));

// PUT


router.put(`/updateInfo/:param`, /*authenticateToken,*/ (req, res) => userController.updateFields(req, res, [`profile_pic`, `lastname`, `firstname`, `occupation`, `location`, `contact_info`]));

router.put(`/updateVerified/:param`, /*authenticateToken, authorizeRoles(`admin`, `superAdmin`),*/ (req, res) => userController.updateField(req, res, `is_verified`));

router.put(`/updateActive/:param`, /*authenticateToken,*/ (req, res) => userController.updateField(req, res, `is_active`));

router.put(`/updateConnected/:param`, /*authenticateToken, authorizeRoles(`admin`, `superAdmin`),*/ (req, res) => userController.updateField(req, res, `is_connected`));

router.put(`/updateUsername/:param`, /*authenticateToken, authorizeRoles(`admin`, `superAdmin`),*/ (req, res) => userController.updateField(req, res, `username`)); //pas nécéssaire a priori sauf si l'admin doit pouvoir le changer dans la verif

router.put(`/updatePassword/:param`, /*authenticateToken,*/ (req, res) => userController.updateField(req, res, `password`));

router.put(`/updateWorkerIsAdmin/:param`, /*authenticateToken,*/ (req, res) => userController.updateWorkerIsAdmin(req, res));// Swagger à faire

router.put(`/updateStudentDetails/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetails(req, res)); // Swagger à faire

export default router;