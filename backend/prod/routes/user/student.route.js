"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = __importDefault(require("../../controllers/user/student.controller"));
const student_model_1 = require("../../models/user/student.model");
const router = express_1.default.Router();
const studentController = new student_controller_1.default();
// POST
router.post('/addStudent', (req, res) => studentController.addUser(req, res, student_model_1.StudentModel, `student`)); // Swagger à faire
// GET
router.get('/getAllStudents', (req, res) => studentController.getAllUsers(req, res, student_model_1.StudentModel)); // Swagger à faire
router.get('/getStudent/:param', (req, res) => studentController.getUser(req, res, student_model_1.StudentModel)); // Swagger à faire
// DELETE
router.delete('/deleteStudent', (req, res) => studentController.deleteUser(req, res, student_model_1.StudentModel)); // Swagger à faire
// PUT
router.put(`/updateStudentInfo/:param`, (req, res) => studentController.updateFields(req, res, student_model_1.StudentModel, ['password', 'profile_pic', 'email', 'name', 'firstname', 'occupation', 'location', 'contact_info', 'school', 'formation', 'experience', 'skills', 'certification', 'languages'])); // Swagger à faire
router.put(`/updateStudentVerified/:param`, (req, res) => studentController.updateField(req, res, student_model_1.StudentModel, `is_verified`)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin
router.put(`/updateStudentActive/:param`, (req, res) => studentController.updateField(req, res, student_model_1.StudentModel, `is_active`)); // Swagger à faire
router.put(`/updateStudentConnected/:param`, (req, res) => studentController.updateField(req, res, student_model_1.StudentModel, `is_connected`)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin
router.put(`/updateStudentUsername/:param`, (req, res) => studentController.updateField(req, res, student_model_1.StudentModel, `username`)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin + pas nécéssaire a priori sauf si l'admin doit pouvoir le changer dans la verif
exports.default = router;
