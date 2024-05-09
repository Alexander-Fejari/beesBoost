"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    async addUser(req, res) {
        try {
            const { username, password, profile_pic, role, lastname, firstname, occupation, location, contact_info } = req.body;
            let { email } = req.body;
            email = email.toLowerCase();
            if (!username || !password || !role || !email) {
                res.status(400).json({ error: `Bad request: username, password, role, and email are required fields` });
                return;
            }
            const roles = [`student`, `worker`, `admin`, `superAdmin`];
            if (!roles.includes(role)) {
                res.status(400).json({ error: `${role} isnt a good role (student, worker, admin or superAdmin)` });
                return;
            }
            const existingUserEmail = await user_model_1.UserModel.findOne({ email: email });
            if (existingUserEmail) {
                res.status(400).json({ error: `User already exists with this email : ${email}` });
                return;
            }
            const existingUserUsername = await user_model_1.UserModel.findOne({ username: username });
            if (existingUserUsername) {
                res.status(400).json({ error: `User already exists with this username : ${username}` });
                return;
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const userData = { username, password: hashedPassword, profile_pic, role, email, lastname, firstname, occupation, location, contact_info };
            if (req.body.role === `student`) {
                userData.student_details = {};
                const { student_details } = req.body;
                if (student_details) {
                    userData.student_details.school = student_details.school;
                    userData.student_details.formation = student_details.formation;
                    userData.student_details.experience = student_details.experience;
                    userData.student_details.skills = student_details.skills;
                    userData.student_details.certification = student_details.certification;
                    userData.student_details.languages = student_details.languages;
                    userData.student_details.game_info = student_details.game_info;
                }
            }
            else if (req.body.role === `worker`) {
                userData.worker_details = {};
                const { worker_details } = req.body;
                if (worker_details) {
                    userData.worker_details.company = worker_details.company;
                    userData.worker_details.is_company_admin = worker_details.is_company_admin;
                }
                // Ajouter logique pour mettre admin si premier à créer la société quand company sera fait, peut aussi être fait ailleurs (dans la fonction qui vérifie par exemple)
            }
            const newUser = new user_model_1.UserModel(userData);
            await newUser.save();
            res.status(201).json({ message: `User added successfully`, userId: newUser._id });
        }
        catch (error) {
            console.error(`Error adding user:`, error);
            res.status(500).json({ error: `Error adding user` });
        }
    }
    async userLogin(req, res) {
        try {
            const { username, password } = req.body;
            let { email } = req.body;
            let user;
            if (email) {
                email = email.toLowerCase();
                user = await user_model_1.UserModel.findOne({ email: email });
            }
            else if (username) {
                user = await user_model_1.UserModel.findOne({ username: username });
            }
            if (!user) {
                res.status(401).json({ message: `Login failed : No user matches those credentials` });
                return;
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                res.status(401).json({ message: `Login failed : Bad password` });
                return;
            }
            // We create the identification token for the user
            const accessToken = jsonwebtoken_1.default.sign({
                id: user._id,
                username: user.username,
                role: user.role
            }, process.env.JWT_SECRET, { expiresIn: `1h` });
            const refreshToken = jsonwebtoken_1.default.sign({
                id: user._id,
                username: user.username
            }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: `7d` });
            await user_model_1.UserModel.updateOne({ _id: user._id }, {
                $set: {
                    is_connected: true,
                    refresh_token: refreshToken
                }
            });
            res.status(200).json({ message: `Login successful`, accessToken, refreshToken });
            // Set a timer to change the value of the is_connected variable to false after one hour
            setTimeout(async () => {
                await user_model_1.UserModel.updateOne({ _id: user._id }, { $set: { is_connected: false }
                });
            }, 60 * 60 * 1000); // 60 minute(s)
        }
        catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: `Internal server error` });
        }
    }
    async renewToken(req, res) {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(401).send({ error: 'No refresh token provided' });
            return;
        }
        const user = await user_model_1.UserModel.findOne({ refresh_token: refreshToken });
        if (!user) {
            res.status(403).send({ error: 'Refresh token not found or invalid' });
            return;
        }
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                    res.status(401).send({ message: "Token expired" });
                }
                else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                    res.status(403).send({ message: "Token is invalid" });
                }
                else {
                    res.status(500).send({ message: "Failed to authenticate token" });
                }
                return;
            }
            if (decoded) {
                const newAccessToken = jsonwebtoken_1.default.sign({
                    id: decoded.id,
                    username: decoded.username,
                    role: user.role
                }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ accessToken: newAccessToken });
            }
            else {
                res.status(404).send({ error: 'Failed to decode refresh token' });
            }
        });
    }
}
exports.default = AuthController;
