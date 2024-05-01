import express, { Router } from 'express';
import UserController from '../controllers/user.controller';

const router: Router = express.Router();
const userController = new UserController();

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

/**
 * @openapi
 * /user/getAllUsers:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieves all users
 *     description: Returns a list of all users in the database.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The user ID.
 *                   username:
 *                     type: string
 *                     description: The user's username.
 *                   profile_pic:
 *                     type: string
 *                     description: URL to the user's profile picture.
 *                   role:
 *                     type: string
 *                     description: The user's role in the system.
 *                   email:
 *                     type: string
 *                     description: The user's email address.
 *       500:
 *         description: Server error retrieving users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the server error.
 */
router.get(`/getAllUsers`, (req, res) => userController.getAllUsers(req, res)); // Swagger a changer

/**
 * @openapi
 * /user/getUser/{username}:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieves a user by username
 *     description: Returns a single user object from the database based on the username provided.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user to retrieve.
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 profile_pic:
 *                   type: string
 *                 role:
 *                   type: string
 *                 email:
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
 *         description: Server error retrieving the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get(`/getUser/:username`, (req, res) => userController.getUser(req, res));

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
router.delete(`/deleteUser`, (req, res) => userController.deleteUser(req, res));

/**
 * @openapi
 * /user/updateProfilePicture/{username}:
 *   put:
 *     summary: Update a user's profile picture
 *     tags:
 *       - User
 *     description: Updates the profile picture URL of a specified user.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user whose profile picture is to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profile_pic:
 *                 type: string
 *                 example: 'https://example.com/new-profile.jpg'
 *                 description: The new URL of the user's profile picture.
 *     responses:
 *       200:
 *         description: Profile picture updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Profile picture updated successfully'
 *       400:
 *         description: Invalid input, object invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error or unable to update the profile picture.
 */
router.put(`/updateProfilePicture/:username`, (req, res) => userController.updateProfilePicture(req, res));

router.put(`/updateIsVerified/:username`, (req, res) => userController.updateIsVerified(req, res));// Ajouter protection : Possible que si admin/superAdmin

router.put(`/updateIsActive/:username`, (req, res) => userController.updateIsActive(req, res));

router.put(`/updatePassword/:username`, (req, res) => userController.updatePassword(req, res));

router.put(`/updateEmail/:username`, (req, res) => userController.updateEmail(req, res));

router.put(`/updateUsername/:username`, (req, res) => userController.updateUsername(req, res));// Ajouter protection : Possible que si admin/superAdmin

export default router;