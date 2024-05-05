"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    // UTILS
    async findUserByUsername(model, username) {
        return await model.findOne({ username });
    }
    async findUserById(model, _id) {
        return await model.findById(_id);
    }
    async getUserObject(model, username_or_id) {
        return (username_or_id.length < 24 ? await model.findOne({ username: username_or_id }) : await model.findById(username_or_id));
    }
    async getUserByUsername(req, res, model, username) {
        try {
            const user = await model.findOne({ username });
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
    async getUserById(req, res, model, _id) {
        try {
            const user = await model.findById(_id);
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
    async checkErrorUpdateField(req, res, model, param) {
        try {
            if (param.length > 24) {
                res.status(404).json({ error: `Wrong username or id: ${param}` });
                return true;
            }
            const user = await this.getUserObject(model, param);
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
    // POST
    async addUser(req, res, Model, typeOfProfile) {
        try {
            const { username, password, profile_pic, role, email, lastname, firstname, occupation, location, contact_info } = req.body;
            if (!username || !password || !role || !email) {
                res.status(400).json({ error: 'Bad request: username, password, role, and email are required fields' });
                return;
            }
            const existingUser = await this.findUserByUsername(Model, username);
            if (existingUser) {
                res.status(400).json({ error: `User already exists` });
                return;
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const userData = { username, password: hashedPassword, profile_pic, role, email, lastname, firstname, occupation, location, contact_info };
            if (typeOfProfile === `student`) {
                const { school, formation, experience, skills, certification, languages } = req.body;
                userData.school = school;
                userData.formation = formation;
                userData.experience = experience;
                userData.skills = skills;
                userData.certification = certification;
                userData.languages = languages;
            }
            else if (typeOfProfile === `worker`) {
                const { entreprise, is_admin } = req.body;
                userData.entreprise = entreprise;
                userData.is_admin = is_admin;
            }
            const newUser = new Model(userData);
            await newUser.save();
            res.status(201).json({ message: `User added successfully`, userId: newUser._id });
        }
        catch (error) {
            console.error(`Error adding user:`, error);
            res.status(500).json({ error: `Error adding user` });
        }
    }
    // GET
    async getAllUsers(req, res, model) {
        try {
            let query = {};
            if (req.query && Object.keys(req.query).length > 0) {
                const validKeys = Object.keys(req.query).every(key => Object.keys(model.schema.obj).includes(key));
                if (!validKeys) {
                    res.status(400).json({ error: 'Invalid query parameters' });
                    return;
                }
                query = req.query;
            }
            const users = await model.find(query);
            if (users.length === 0) {
                res.status(404).json({ message: 'User not found matching those parameters' });
                return;
            }
            res.json(users);
        }
        catch (error) {
            console.error(`Error retrieving users:`, error);
            res.status(500).json({ error: `Error retrieving users` });
        }
    }
    async getUser(req, res, model) {
        try {
            const { param } = req.params;
            if (param.length < 24) {
                return (this.getUserByUsername(req, res, model, param));
            }
            else if (param.length == 24) {
                return (this.getUserById(req, res, model, param));
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
    async deleteUser(req, res, model) {
        try {
            const id = req.body.id;
            const username = req.body.username;
            if ((id && username) || (!id && !username)) {
                res.status(400).json({ error: `Request must contain id OR username` });
                return;
            }
            if ((id && id.length != 24) || (username && username.length > 23)) {
                res.status(400).json({ error: `id or username not in the good format` });
                return;
            }
            const query = id ? { _id: id } : { username: username };
            const result = await model.deleteOne(query);
            if (result.deletedCount == 0) {
                res.status(404).json({ error: `User not found` });
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
    async updateField(req, res, model, fieldToUpdate) {
        try {
            const param = req.params.param;
            const updateData = req.body;
            if (await this.checkErrorUpdateField(req, res, model, param) == true) {
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
            const result = await model.updateOne(param.length < 24 ? { username: param } : { _id: param }, updateData);
            // Mettre la logique du mailer plus tard
            if (result.modifiedCount > 0) {
                res.json({ message: `User ${fieldToUpdate} updated successfully` });
            }
            else {
                res.status(404).json({ error: `No changes have been made, same info as before has been given` });
            }
        }
        catch (error) {
            console.error(`Error updating user's ${fieldToUpdate}:`, error);
            res.status(500).json({ error: `Error updating user` });
        }
    }
    async updateFields(req, res, model, allowedFields) {
        try {
            const param = req.params.param;
            const updateData = req.body;
            if (await this.checkErrorUpdateField(req, res, model, param) == true) {
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
            const result = await model.updateOne(param.length < 24 ? { username: param } : { _id: param }, updateData);
            if (result.modifiedCount > 0) {
                res.json({ message: `User's infos have been updated successfully` });
            }
            else {
                res.status(404).json({ error: `No changes have been made, same infos as before have been given` });
            }
        }
        catch (error) {
            console.error(`Error updating user's infos:`, error);
            res.status(500).json({ error: `Error updating user` });
        }
    }
}
exports.default = UserController;
