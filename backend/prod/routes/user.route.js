"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = express_1.default.Router();
const userController = new user_controller_1.default();
// POST
router.post(`/signUp`, (req, res) => userController.addUser(req, res));
// GET
router.get(`/getAllUsers`, /*authenticateToken,*/ (req, res) => userController.getAllUsers(req, res));
router.get(`/getUser/:param`, /*authenticateToken,*/ (req, res) => userController.getUser(req, res));
router.get(`/getAllStudents`, /*authenticateToken,*/ (req, res) => userController.getAllStudents(req, res)); // Pas finie + Swagger à faire
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
router.put(`updateEmail/:param`, /*authenticateToken, */ (req, res) => userController.updateField(req, res, `email`)); // Swagger à faire
router.put(`/updateWorkerIsAdmin/:param`, /*authenticateToken,*/ (req, res) => userController.updateWorkerIsAdmin(req, res)); // Pas finie + Swagger à faire
router.put(`/updateStudentDetails/:param`, /*authenticateToken,*/ (req, res) => userController.updateStudentDetails(req, res)); // Pas finie + Swagger à faire
exports.default = router;
