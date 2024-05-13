import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware'

const router: Router = express.Router();
const userController = new UserController();

// ----------------------------------------------------------- GENERAL -----------------------------------------------------------

  // POST GENERAL INFOS
router.post(`/user/signUp`, (req, res) => userController.addUser(req, res));

  // GET GENERAL INFOS
router.get(`/user/getAllUsers`, /*authenticateToken,*/ (req, res) => userController.getAllUsers(req, res));

router.get(`/user/getUser/:param`, /*authenticateToken,*/ (req, res) => userController.getUser(req, res));

  // DELETE GENERAL INFOS
router.delete(`/user/deleteUser`, /*authenticateToken, authorizeRoles(`superAdmin`),*/ (req, res) => userController.deleteUser(req, res)); // Only for superAdmin

  // UPDATE GENERAL INFOS
router.put(`/user/updateInfos/:param`, /*authenticateToken,*/ (req, res) => userController.updateFields(req, res));

router.put(`/user/updateVerified/:param`, /*authenticateToken, authorizeRoles(`admin`, `superAdmin`),*/ (req, res) => userController.updateField(req, res, `is_verified`));

router.put(`/user/updateActive/:param`, /*authenticateToken,*/ (req, res) => userController.updateField(req, res, `is_active`));

router.put(`/user/updateConnected/:param`, /*authenticateToken, authorizeRoles(`admin`, `superAdmin`),*/ (req, res) => userController.updateField(req, res, `is_connected`));

router.put(`/user/updateUsername/:param`, /*authenticateToken, authorizeRoles(`admin`, `superAdmin`),*/ (req, res) => userController.updateField(req, res, `username`)); // pas nécéssaire à priori sauf si l'admin doit pouvoir le changer dans la vérif

router.put(`/user/updatePassword/:param`, /*authenticateToken,*/ (req, res) => userController.updateField(req, res, `password`));

router.put(`/user/updateEmail/:param`, /*authenticateToken, */ (req, res) => userController.updateField(req, res, `email`));


// ----------------------------------------------------------- WORKER -----------------------------------------------------------

  // GET WORKER INFOS
//router.get(`worker/getAllWorkers`, (req, res) => userController.getAllWorkers(req, res)); // Pas finie + Swagger à faire

router.get(`/worker/getDetails/:param`, /*authenticateToken,*/ (req, res) => userController.getDetails(req, res, `worker_details`));

  // UPDATE WORKER INFOS
router.put(`/worker/updateIsAdmin/:param`, /*authenticateToken,*/ (req, res) => userController.updateWorkerIsAdmin(req, res));

router.put(`/worker/updateCompany/:param`, /*authenticateToken,*/ (req, res) => userController.updateWorkerDetail(req, res, `company`));


// ----------------------------------------------------------- STUDENT -----------------------------------------------------------

  // GET STUDENT INFOS
router.get(`/student/getAllStudents`, /*authenticateToken,*/ (req, res) => userController.getAllStudents(req, res));  // Pas finie + Swagger à faire

router.get(`/student/getDetails/:param`, /*authenticateToken,*/ (req, res) => userController.getDetails(req, res, `student_details`));

router.get(`/student/getLastRegisteredStudents`, /*authenticateToken,*/ (req, res) => userController.getLastStudents(req, res, 5));

  // UPDATE STUDENT INFOS
router.put(`/student/updateSchool/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetail(req, res, `school`));

router.put(`/student/updateFormation/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetailArray(req, res, `formation`));

router.put(`/student/updateExperience/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetailArray(req, res, `experience`));

router.put(`/student/updateSkill/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetailArray(req, res, `skills`));

router.put(`/student/updateCertification/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetailArray(req, res, `certification`));

router.put(`/student/updateLanguage/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetailArray(req, res, `languages`));

router.put(`/student/updateGameInfo/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetailArray(req, res, `game_info`));

export default router;