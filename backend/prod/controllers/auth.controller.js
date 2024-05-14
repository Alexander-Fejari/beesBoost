"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const user_controller_1 = __importDefault(require("./user.controller"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
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
                res.status(401).json({ error: `Login failed : No user matches those credentials` });
                return;
            }
            if (user.is_active == false) {
                res.status(403).json({ error: `This account isnt active` });
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
            }, process.env.JWT_SECRET_AUTH, { expiresIn: `1h` });
            const refreshToken = jsonwebtoken_1.default.sign({
                id: user._id,
                username: user.username
            }, process.env.JWT_SECRET_REFRESH, { expiresIn: `7d` });
            await user_model_1.UserModel.updateOne({ _id: user._id }, {
                $set: {
                    is_connected: true,
                    refresh_token: refreshToken
                }
            });
            res.status(200).json({ message: `Login successful`, accessToken /*, refreshToken*/ });
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
    async logOut(req, res) {
        try {
            // const { refreshToken } = req.body;
            // if (!refreshToken) {
            //   res.status(400).json({ error: "No refresh token provided" });
            //   return;
            // }
            // const result = await UserModel.updateOne(
            //   { refresh_token: refreshToken },
            //   { $set: { refresh_token: '', is_connected: false } }
            // );
            // if (result.modifiedCount === 0) {
            //   res.status(404).json({ error: "Refresh token not found" });
            //   return;
            // }
            const { param } = req.params;
            if (!param) {
                res.status(400).json({ error: `User id/username is required for logout` });
                return;
            }
            const user = await user_controller_1.default.getUserObject(req, res, param);
            if (!user) {
                res.status(404).json({ error: `User not found` });
                return;
            }
            const result = await user_model_1.UserModel.updateOne({ _id: user._id }, { $set: { is_connected: false } });
            if (result.modifiedCount === 0) {
                res.status(404).json({ error: `User not found` });
                return;
            }
            res.status(200).json({ message: `Logout successful` });
        }
        catch (error) {
            console.error(`Logout error:`, error);
            res.status(500).json({ error: `Internal server error` });
        }
    }
}
exports.default = new AuthController;
