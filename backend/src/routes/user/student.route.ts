import express, { Router } from 'express';
import StudentController from '../../controllers/user/student.controller';
import { StudentModel } from '../../models/user/student.model';

const router: Router = express.Router();
const studentController = new StudentController();

// POST


router.post('/addStudent', (req, res) => studentController.addUser(req, res, StudentModel)); // Swagger à faire

// GET


router.get('/getAllStudents', (req, res) => studentController.getAllUsers(req, res, StudentModel)); // Swagger à faire

router.get('/getStudent/:param', (req, res) => studentController.getUser(req, res, StudentModel)); // Swagger à faire

// DELETE


router.delete('/deleteStudent', (req, res) => studentController.deleteUser(req, res, StudentModel)); // Swagger à faire

// PUT


router.put(`/updateStudentInfo/:param`, (req, res) => studentController.updateFields(req, res, StudentModel, ['password', 'profile_pic', 'email', 'name', 'firstname', 'occupation', 'location', 'contact_info','school', 'formation', 'experience', 'skills', 'certification', 'languages'])); // Swagger à faire

router.put(`/updateStudentVerified/:param`, (req, res) => studentController.updateField(req, res, StudentModel, `is_verified`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin

router.put(`/updateStudentActive/:param`, (req, res) => studentController.updateField(req, res, StudentModel, `is_active`)); // Swagger à faire

router.put(`/updateStudentConnected/:param`, (req, res) => studentController.updateField(req, res, StudentModel, `is_connected`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin

router.put(`/updateStudentUsername/:param`, (req, res) => studentController.updateField(req, res, StudentModel, `username`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin + pas nécéssaire a priori sauf si l'admin doit pouvoir le changer dans la verif

export default router;
