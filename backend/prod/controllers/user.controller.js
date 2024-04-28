"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
class UserController {
    async addUser(req, res) {
        try {
            const { username, profile_pic, role, email } = req.body;
            const newUser = new user_model_1.UserModel({ username, profile_pic, role, email });
            await newUser.save();
            res.status(201).json({ message: 'User added successfully', userId: newUser._id });
        }
        catch (error) {
            console.error('Error adding user:', error);
            res.status(500).json({ error: 'Error adding user' });
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await user_model_1.UserModel.find({});
            res.json(users);
        }
        catch (error) {
            console.error('Error retrieving users:', error);
            res.status(500).json({ error: 'Error retrieving users' });
        }
    }
    async getUser(req, res) {
        try {
            const { username } = req.params;
            const user = await user_model_1.UserModel.findOne({ username });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            console.error('Error retrieving user:', error);
            res.status(500).json({ error: 'Error retrieving user' });
        }
    }
}
exports.default = UserController;
