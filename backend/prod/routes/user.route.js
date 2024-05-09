"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const userController = new user_controller_1.default();
// POST
//router.post(`/addUser`, (req, res) => userController.addUser(req, res)); 
// GET
router.get(`/getAllUsers`, auth_middleware_1.authenticateToken, (0, auth_middleware_1.authorizeRoles)(`admin`), (req, res) => userController.getAllUsers(req, res)); // Swagger à faire
router.get(`/getUser/:param`, (req, res) => userController.getUser(req, res)); // Swagger à faire
router.get(`/getAllStudents`, (req, res) => userController.getAllStudents(req, res)); // Swagger à faire
//router.get(`/getAllWorkers`, (req, res) => userController.getAllSW(req, res, `worker`)); // Swagger à faire
// DELETE
router.delete(`/deleteUser`, (req, res) => userController.deleteUser(req, res)); // Swagger à faire + Ajouter Protection : admin/superAdmin 
// PUT
router.put(`/updateInfo/:param`, (req, res) => userController.updateFields(req, res, [`profile_pic`, `email`, `lastname`, `firstname`, `occupation`, `location`, `contact_info`])); // Swagger à faire
router.put(`/updateVerified/:param`, (req, res) => userController.updateField(req, res, `is_verified`)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin
router.put(`/updateActive/:param`, (req, res) => userController.updateField(req, res, `is_active`)); // Swagger à faire
router.put(`/updateConnected/:param`, (req, res) => userController.updateField(req, res, `is_connected`)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin
router.put(`/updateUsername/:param`, (req, res) => userController.updateField(req, res, `username`)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin + pas nécéssaire a priori sauf si l'admin doit pouvoir le changer dans la verif
router.put(`/updatePassword/:param`, (req, res) => userController.updateField(req, res, `password`)); // Swagger à faire
router.put(`/updateWorkerIsAdmin/:param`, (req, res) => userController.updateWorkerIsAdmin(req, res)); // Swagger à faire
router.put(`/updateStudentDetails/:param`, (req, res) => userController.updateStudentDetails(req, res)); // Swagger à faire
exports.default = router;
