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

//router.get(`getStudentDetails/:param`, /*authenticateToken,*/ (req, res) => userController.getStudentDetails(req, res)); // A faire + Swagger à faire

router.get(`/getAllStudents`, /*authenticateToken,*/ (req, res) => userController.getAllStudents(req, res)); // Pas finie + Swagger à faire

//router.get(`/getAllWorkers`, (req, res) => userController.getAllSW(req, res, `worker`)); // Pas finie + Swagger à faire

router.get(`/getLastRegisteredStudents`, /*authenticateToken,*/ (req, res) => userController.getLastStudents(req, res, 5));

// DELETE

router.delete(`/deleteUser`, /*authenticateToken, authorizeRoles(`superAdmin`),*/ (req, res) => userController.deleteUser(req, res));

// PUT

  // UPDATE GENERAL INFOS
router.put(`/updateInfos/:param`, /*authenticateToken,*/ (req, res) => userController.updateFields(req, res)); // Swagger à faire

router.put(`/updateVerified/:param`, /*authenticateToken, authorizeRoles(`admin`, `superAdmin`),*/ (req, res) => userController.updateField(req, res, `is_verified`));

router.put(`/updateActive/:param`, /*authenticateToken,*/ (req, res) => userController.updateField(req, res, `is_active`));

router.put(`/updateConnected/:param`, /*authenticateToken, authorizeRoles(`admin`, `superAdmin`),*/ (req, res) => userController.updateField(req, res, `is_connected`));

router.put(`/updateUsername/:param`, /*authenticateToken, authorizeRoles(`admin`, `superAdmin`),*/ (req, res) => userController.updateField(req, res, `username`)); // pas nécéssaire à priori sauf si l'admin doit pouvoir le changer dans la vérif

router.put(`/updatePassword/:param`, /*authenticateToken,*/ (req, res) => userController.updateField(req, res, `password`));

router.put(`/updateEmail/:param`, /*authenticateToken, */ (req, res) => userController.updateField(req, res, `email`)); // Swagger à faire


  // UPDATE WORKER INFOS
router.put(`/updateWorkerIsAdmin/:param`, /*authenticateToken,*/ (req, res) => userController.updateWorkerIsAdmin(req, res)); // Swagger à faire

router.put(`/updateWorkerCompany/:param`, /*authenticateToken,*/ (req, res) => userController.updateWorkerDetail(req, res, `company`)); // Swagger à faire


  // UPDATE STUDENT INFOS
router.put(`/updateStudSchool/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetail(req, res, `school`)); // Swagger à faire

router.put(`/updateStudFormation/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetail(req, res, `formation`)); // Swagger à faire

router.put(`/updateStudExperience/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetail(req, res, `experience`)); // Swagger à faire

router.put(`/updateStudSkill/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetail(req, res, `skills`)); // Swagger à faire

router.put(`/updateStudCertification/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetail(req, res, `certification`)); // Swagger à faire

router.put(`/updateStudLanguage/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetail(req, res, `languages`)); // Swagger à faire

router.put(`/updateStudGameInfo/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetail(req, res, `game_info`)); // Swagger à faire

export default router;