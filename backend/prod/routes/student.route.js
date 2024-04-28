"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = __importDefault(require("../controllers/student.controller"));
const router = express_1.default.Router();
const studentController = new student_controller_1.default();
router.get('/getAllStudents', (req, res) => studentController.getAllStudents(req, res));
router.get('/getStudent/:username', (req, res) => studentController.getStudent(req, res));
router.post('/addStudent', (req, res) => studentController.addStudent(req, res));
router.delete('/deleteStudent', (req, res) => studentController.deleteStudent(req, res));
router.put('/updateStudent/:username', (req, res) => studentController.updateStudent(req, res));
exports.default = router;
