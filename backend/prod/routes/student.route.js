"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = __importDefault(require("../controllers/student.controller"));
const router = express_1.default.Router();
const studentController = new student_controller_1.default();
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
router.get('/getAllStudents', (req, res) => studentController.getAllStudents(req, res));
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
router.get('/getStudent/:username', (req, res) => studentController.getStudent(req, res));
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
router.post('/addStudent', (req, res) => studentController.addStudent(req, res));
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
router.delete('/deleteStudent', (req, res) => studentController.deleteStudent(req, res));
/**
 * @openapi
 * /student/updateStudent/{username}:
 *   put:
 *     tags:
 *       - Student
 *     summary: Updates a student's information
 *     description: Modifies the data of an existing student in the database based on the username provided.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the student to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated successfully.
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
 *         description: Error updating the student in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put('/updateStudent/:username', (req, res) => studentController.updateStudent(req, res));
exports.default = router;
