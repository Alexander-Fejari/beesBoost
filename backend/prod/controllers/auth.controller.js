"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const user_controller_1 = __importDefault(require("./user.controller"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_service_1 = __importDefault(require("../services/mailer.service"));
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
            if (user.is_active == false || user.is_verified == false /*|| user.email_confirmed == false*/) {
                res.status(403).json({ error: `This account isnt active, verified and/or its email hasnt been confirmed` });
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
            }, process.env.JWT_SECRET_AUTH, { expiresIn: `10s` });
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
            res.status(401).send({ error: `No refresh token provided` });
            return;
        }
        const user = await user_model_1.UserModel.findOne({ refresh_token: refreshToken });
        if (!user) {
            res.status(403).send({ error: `Refresh token not found or invalid` });
            return;
        }
        jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (error, decoded) => {
            if (error) {
                if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                    res.status(401).send({ message: `Token expired` });
                }
                else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                    res.status(403).send({ message: `Token is invalid` });
                }
                else {
                    res.status(500).send({ message: `Failed to authenticate token` });
                }
                return;
            }
            if (decoded) {
                const newAccessToken = jsonwebtoken_1.default.sign({
                    id: decoded.id,
                    username: decoded.username,
                    role: user.role
                }, process.env.JWT_SECRET_AUTH, { expiresIn: `15s` });
                res.json({ accessToken: newAccessToken });
            }
            else {
                res.status(404).send({ error: `Failed to decode refresh token` });
            }
        });
    }
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
    async logOut(req, res) {
        try {
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
    async requestPasswordReset(req, res) {
        try {
            const { id } = req.body;
            const user = await user_model_1.UserModel.findOne({ _id: id });
            if (!user) {
                res.status(404).json({ error: `Utilisateur non trouvé.` });
                return;
            }
            const resetToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET_PASS_RESET, { expiresIn: '30m' });
            user.reset_token_pass = resetToken;
            await user.save();
            await mailer_service_1.default.sendPasswordResetEmail(user.email, user.username, resetToken);
            res.status(200).json({ message: `Email de réinitialisation envoyé.`, resetToken });
        }
        catch (error) {
            console.error(`Erreur lors de la demande de réinitialisation :`, error);
            res.status(500).json({ error: `Erreur interne du serveur.` });
        }
    }
    async resetPassword(req, res) {
        try {
            const { token } = req.params;
            const { new_password } = req.body;
            if (!new_password || new_password.length < 6) {
                res.status(400).json({ error: `Le mot de passe doit contenir au moins 6 caractères.` });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_PASS_RESET);
            const user = await user_model_1.UserModel.findById(decoded.id);
            if (!user) {
                res.status(400).json({ error: `Token invalide ou expiré.` });
                return;
            }
            const hashedPassword = await bcrypt_1.default.hash(new_password, 10);
            user.password = hashedPassword;
            user.reset_token_pass = null;
            await user.save();
            res.status(200).json({ message: `Mot de passe réinitialisé avec succès.` });
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                res.status(401).json({ error: `Token expiré.` });
            }
            else {
                console.error(`Erreur lors de la réinitialisation du mot de passe :`, error);
                res.status(500).json({ error: `Erreur interne du serveur.` });
            }
        }
    }
}
exports.default = new AuthController;
