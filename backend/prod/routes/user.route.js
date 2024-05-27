"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// ----------------------------------------------------------- GENERAL -----------------------------------------------------------
// POST GENERAL INFOS
router.post(`/user/signUp`, (req, res) => user_controller_1.default.addUser(req, res)); // Swagger à modifier (mailer + prefered_language)
// GET GENERAL INFOS
router.get(`/user/getAllUsers`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.getAllUsers(req, res));
router.get(`/user/getUser/:param`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.getUser(req, res));
router.get('/user/confirmEmail/:token', (req, res) => user_controller_1.default.confirmEmail(req, res)); // Swagger à faire
router.get(`/user/resendConfirmationEmail/:email`, (req, res) => user_controller_1.default.resendConfirmationEmail(req, res)); // Swagger à faire
// DELETE GENERAL INFOS
router.delete(`/user/deleteUser`, auth_middleware_1.authenticateToken, (0, auth_middleware_1.authorizeRoles)(`superAdmin`), (req, res) => user_controller_1.default.deleteUser(req, res)); // Only for superAdmin
// UPDATE GENERAL INFOS
router.put(`/user/updateInfos/:param`, /* authenticateToken, */ (req, res) => user_controller_1.default.updateFields(req, res)); // Swagger à Modifier
router.put(`/user/updateVerified/:param`, auth_middleware_1.authenticateToken, (0, auth_middleware_1.authorizeRoles)(`admin`, `superAdmin`), (req, res) => user_controller_1.default.updateField(req, res, `is_verified`));
router.put(`/user/updateActive/:param`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.updateField(req, res, `is_active`));
router.put(`/user/updateConnected/:param`, auth_middleware_1.authenticateToken, (0, auth_middleware_1.authorizeRoles)(`admin`, `superAdmin`), (req, res) => user_controller_1.default.updateField(req, res, `is_connected`));
router.put(`/user/updateUsername/:param`, auth_middleware_1.authenticateToken, (0, auth_middleware_1.authorizeRoles)(`admin`, `superAdmin`), (req, res) => user_controller_1.default.updateField(req, res, `username`)); // pas nécéssaire à priori sauf si l'admin doit pouvoir le changer dans la vérif
router.put(`/user/updatePassword/:param`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.updateField(req, res, `password`));
router.put(`/user/updateEmail/:param`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.updateField(req, res, `email`));
router.put(`/user/updatePreferedLanguage/:param`, /* authenticateToken, */ (req, res) => user_controller_1.default.updateField(req, res, `prefered_language`)); // Swagger à faire
// ----------------------------------------------------------- WORKER -----------------------------------------------------------
// GET WORKER INFOS
//router.get(`worker/getAllWorkers`, (req, res) => userController.getAllWorkers(req, res)); // Pas finie + Swagger à faire
router.get(`/worker/getDetails/:param`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.getDetails(req, res, `worker_details`));
// UPDATE WORKER INFOS
router.put(`/worker/updateIsAdmin/:param`, /* authenticateToken, */ (req, res) => user_controller_1.default.updateWorkerIsAdmin(req, res));
router.put(`/worker/updateCompany/:param`, /* authenticateToken, */ (req, res) => user_controller_1.default.updateWorkerDetail(req, res, `company`));
// ----------------------------------------------------------- STUDENT -----------------------------------------------------------
// GET STUDENT INFOS
router.get(`/student/getAllStudents`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.getAllStudents(req, res)); // Pas finie + Swagger à faire
router.get(`/student/getDetails/:param`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.getDetails(req, res, `student_details`));
router.get(`/student/getLastRegisteredStudents`, (req, res) => user_controller_1.default.getLastStudents(req, res, 5));
// UPDATE STUDENT INFOS
router.put(`/student/updateSchool/:param`, /* authenticateToken, */ (req, res) => user_controller_1.default.updateStudentDetail(req, res, `school`));
router.put(`/student/updateFormation/:param`, /* authenticateToken, */ (req, res) => user_controller_1.default.updateStudentDetailArray(req, res, `formation`));
router.put(`/student/updateExperience/:param`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.updateStudentDetailArray(req, res, `experience`));
router.put(`/student/updateSkill/:param`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.updateStudentDetailArray(req, res, `skills`));
router.put(`/student/updateCertification/:param`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.updateStudentDetailArray(req, res, `certification`));
router.put(`/student/updateLanguage/:param`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.updateStudentDetailArray(req, res, `languages`));
router.put(`/student/updateGameInfo/:param`, auth_middleware_1.authenticateToken, (req, res) => user_controller_1.default.updateStudentDetailArray(req, res, `game_info`));
exports.default = router;
