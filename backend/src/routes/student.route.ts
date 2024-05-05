import express, { Router } from 'express';
import StudentController from '../controllers/student.controller';
import { StudentModel } from '../models/student.model';

const router: Router = express.Router();
const studentController = new StudentController();

/**
 * @openapi
 * /student/addStudent:
 *   post:
 *     tags:
 *       - Student
 *     summary: Adds a new student
 *     description: Creates a new student in the database with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 studentId:
 *                   type: string
 *       500:
 *         description: Error adding the student to the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/addStudent', (req, res) => studentController.addUser(req, res, StudentModel));

/**
 * @openapi
 * /student/getStudent/{username}:
 *   get:
 *     tags:
 *       - Student
 *     summary: Retrieves a student by username
 *     description: Returns a single student object from the database based on the username provided.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the student to retrieve.
 *     responses:
 *       200:
 *         description: A detailed view of a single student.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error retrieving the student from the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/getStudent/:param', (req, res) => studentController.getUser(req, res, StudentModel));

/**
 * @openapi
 * /student/getAllStudents:
 *   get:
 *     tags:
 *       - Student
 *     summary: Retrieves all students
 *     description: Returns a list of all students in the database.
 *     responses:
 *       200:
 *         description: An array of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Error retrieving students from the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/getAllStudents', (req, res) => studentController.getAllUsers(req, res, StudentModel));

/**
 * @openapi
 * /student/deleteStudent:
 *   delete:
 *     tags:
 *       - Student
 *     summary: Deletes a student by username
 *     description: Removes a student from the database based on the username provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the student to delete.
 *     responses:
 *       200:
 *         description: Student deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Student not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error deleting the student from the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete('/deleteStudent', (req, res) => studentController.deleteUser(req, res, StudentModel));

router.put(`/updateStudentInfo/:param`, (req, res) => studentController.updateFields(req, res, StudentModel, ['password', 'profile_pic', 'email', 'name', 'firstname', 'school', 'occupation', 'location', 'contact_info', 'formation', 'experience', 'skills', 'certification', 'languages'])); // Swagger à faire

router.put(`/updateStudentVerified/:param`, (req, res) => studentController.updateField(req, res, StudentModel, `is_verified`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin

router.put(`/updateStudentActive/:param`, (req, res) => studentController.updateField(req, res, StudentModel, `is_active`)); // Swagger à faire

router.put(`/updateStudentConnected/:param`, (req, res) => studentController.updateField(req, res, StudentModel, `is_connected`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin

router.put(`/updateStudentUsername/:param`, (req, res) => studentController.updateField(req, res, StudentModel, `username`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin + pas nécéssaire a priori sauf si l'admin doit pouvoir le changer dans la verif

export default router;
