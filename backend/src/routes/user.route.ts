import express, { Router } from 'express';
import UserController from '../controllers/user.controller';

const router: Router = express.Router();
const userController = new UserController();

// POST

/**
 * @openapi
 * /user/addUser:
 *   post:
 *     tags:
 *       - User
 *     summary: Adds a new user
 *     description: Creates a new user in the database with the provided username, profile picture, role, and email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *               profile_pic:
 *                 type: string
 *                 required: false
 *               role:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: User added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       500:
 *         description: Server error adding the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post(`/addUser`, (req, res) => userController.addUser(req, res));

// GET


router.get(`/getAllUsers`, (req, res) => userController.getAllUsers(req, res)); // Swagger à faire

router.get(`/getUser/:param`, (req, res) => userController.getUser(req, res)); // Swagger à faire

// DELETE

/**
 * @openapi
 * /user/deleteUser:
 *   delete:
 *     summary: Delete a user
 *     tags: 
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'johndoe'
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error deleting user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete(`/deleteUser`, (req, res) => userController.deleteUser(req, res)); // Ajouter Protection : admin/superAdmin 

// PUT


router.put(`/updateProfilePicture/:param`, (req, res) => userController.updateProfilePicture(req, res)); // Swagger à faire

router.put(`/updateIsVerified/:param`, (req, res) => userController.updateIsVerified(req, res));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin

router.put(`/updateIsActive/:param`, (req, res) => userController.updateIsActive(req, res)); // Swagger à faire

router.put(`/updatePassword/:param`, (req, res) => userController.updatePassword(req, res)); // Swagger à faire

router.put(`/updateEmail/:param`, (req, res) => userController.updateEmail(req, res)); // Swagger à faire

router.put(`/updateUsername/:param`, (req, res) => userController.updateUsername(req, res));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin

export default router;