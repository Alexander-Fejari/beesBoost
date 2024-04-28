import express, { Router } from 'express';
import StudentController from '../controllers/student.controller';

const router: Router = express.Router();
const studentController = new StudentController();

router.get('/getAllStudents', (req, res) => studentController.getAllStudents(req, res));

router.get('/getStudent/:username', (req, res) => studentController.getStudent(req, res));

router.post('/addStudent', (req, res) => studentController.addStudent(req, res));

router.delete('/deleteStudent', (req, res) => studentController.deleteStudent(req, res));

router.put('/updateStudent/:username', (req, res) => studentController.updateStudent(req, res));

export default router;
