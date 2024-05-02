"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    // UTILS
    async findUserByUsername(username) {
        return await user_model_1.UserModel.findOne({ username });
    }
    async findUserById(_id) {
        return await user_model_1.UserModel.findById(_id);
    }
    async getUserObject(username_or_id, model) {
        return (username_or_id.length < 24 ? await model.findOne({ username: username_or_id }) : await model.findById(username_or_id));
    }
    async getUserByUsername(req, res, username) {
        try {
            const user = await user_model_1.UserModel.findOne({ username });
            if (!user) {
                res.status(404).json({ message: `User not found` });
                return;
            }
            res.json(user);
        }
        catch (error) {
            console.error(`Error retrieving user:`, error);
            res.status(500).json({ error: `Error retrieving user` });
        }
    }
    async getUserById(req, res, _id) {
        try {
            const user = await user_model_1.UserModel.findById(_id);
            if (!user) {
                res.status(404).json({ message: `User not found` });
                return;
            }
            res.json(user);
        }
        catch (error) {
            console.error(`Error retrieving user:`, error);
            res.status(500).json({ error: `Error retrieving user` });
        }
    }
    async checkErrorUpdateField(req, res, param, model) {
        try {
            if (param.length > 24) {
                res.status(404).json({ error: `Wrong username or id: ${param}` });
                return true;
            }
            const user = await this.getUserObject(param, model);
            if (!user) {
                res.status(404).json({ message: `User not found` });
                return true;
            }
            return false;
        }
        catch (error) {
            console.error(`Error checking error for users:`, error);
            res.status(500).json({ error: `Error updating user` });
            return true;
        }
    }
    async updateField(req, res, fieldToUpdate, model) {
        try {
            const param = req.params.param;
            const updateData = req.body;
            if (await this.checkErrorUpdateField(req, res, param, model) == true) {
                return;
            }
            // Check if there is only one field to update
            if (Object.keys(updateData).length !== 1) {
                if (Object.keys(updateData).length === 0) {
                    res.status(400).json({ error: `Empty request : Need ${fieldToUpdate}` });
                    return;
                }
                res.status(400).json({ error: `Only one field (${fieldToUpdate}) can be updated at a time` });
                return;
            }
            // Check if its the good field to update
            if (!(fieldToUpdate in updateData)) {
                res.status(400).json({ error: `Only the ${fieldToUpdate} can be updated` });
                return;
            }
            await user_model_1.UserModel.updateOne(param.length < 24 ? { username: param } : { _id: param }, updateData);
            // Mettre la logique du mailer plus tard
            res.json({ message: `User ${fieldToUpdate} updated successfully` });
        }
        catch (error) {
            console.error(`Error updating user's ${fieldToUpdate}:`, error);
            res.status(500).json({ error: `Error updating user` });
        }
    }
    // POST
    async addUser(req, res) {
        try {
            const { username, password, profile_pic, role, email } = req.body;
            const existingUser = await this.findUserByUsername(username);
            if (existingUser) {
                res.status(400).json({ error: `User already exists` });
                return;
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const newUser = new user_model_1.UserModel({ username, password: hashedPassword, profile_pic, role, email });
            await newUser.save();
            res.status(201).json({ message: `User added successfully`, userId: newUser._id });
        }
        catch (error) {
            console.error(`Error adding user:`, error);
            res.status(500).json({ error: `Error adding user` });
        }
    }
    // GET
    async getAllUsers(req, res) {
        try {
            let query = {};
            if (req.query && Object.keys(req.query).length > 0) {
                query = req.query;
            }
            const users = await user_model_1.UserModel.find(query);
            res.json(users);
        }
        catch (error) {
            console.error(`Error retrieving users:`, error);
            res.status(500).json({ error: `Error retrieving users` });
        }
    }
    async getUser(req, res) {
        try {
            const { param } = req.params;
            if (param.length < 24) {
                return (this.getUserByUsername(req, res, param));
            }
            else if (param.length == 24) {
                return (this.getUserById(req, res, param));
            }
            else {
                res.status(400).json({ message: `Impossible id/username` });
                return;
            }
        }
        catch (error) {
            console.error(`Error retrieving user:`, error);
            res.status(500).json({ error: `Error retrieving user` });
        }
    }
    // DELETE
    async deleteUser(req, res) {
        try {
            const { username } = req.body;
            const result = await user_model_1.UserModel.deleteOne({ username });
            if (result.deletedCount == 0) {
                res.status(404).json({ message: `User not found` });
                return;
            }
            res.json({ message: `User deleted successfully` });
        }
        catch (error) {
            console.error(`Error deleting user:`, error);
            res.status(500).json({ error: `Error deleting user` });
        }
    }
    // PUT
    async updateFields(req, res, model, allowedFields) {
        try {
            const param = req.params.param;
            const updateData = req.body;
            if (await this.checkErrorUpdateField(req, res, param, model) == true) {
                return;
            }
            for (const field of Object.keys(updateData)) {
                if (field === `password`) {
                    if (!updateData.password) {
                        res.status(400).json({ error: `Password field is required` });
                        return;
                    }
                    const hashedPassword = await bcrypt_1.default.hash(updateData.password, 10);
                    updateData.password = hashedPassword;
                }
                if (!allowedFields.includes(field)) {
                    res.status(400).json({ error: `Invalid field in the body, only this can be updated ${allowedFields}` });
                    return;
                }
            }
            // Mettre la logique du mailer plus tard
            model.updateOne(param.length < 24 ? { username: param } : { _id: param }, updateData);
            res.json({ message: `User's infos have been updated successfully` });
        }
        catch (error) {
            console.error(`Error updating user's infos:`, error);
            res.status(500).json({ error: `Error updating user` });
        }
    }
    async updateIsVerified(req, res, model) {
        await this.updateField(req, res, `is_verified`, model);
    }
    async updateIsActive(req, res, model) {
        await this.updateField(req, res, `is_active`, model);
    }
    async updateUsername(req, res, model) {
        await this.updateField(req, res, `username`, model);
    }
}
exports.default = UserController;
