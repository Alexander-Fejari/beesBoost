"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = express_1.default.Router();
const userController = new user_controller_1.default();
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
router.get('/getAllUsers', (req, res) => userController.getAllUsers(req, res));
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
router.get('/getUser/:username', (req, res) => userController.getUser(req, res));
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
router.post('/addUser', (req, res) => userController.addUser(req, res));
exports.default = router;
