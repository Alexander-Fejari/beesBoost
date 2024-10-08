"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const mongodb_1 = require("mongodb");
const mailer_service_1 = __importDefault(require("../services/mailer.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    // UTILS
    async getUserObject(req, res, username_or_id) {
        try {
            const user = (username_or_id.length < 24 ? await user_model_1.UserModel.findOne({ username: username_or_id }) : await user_model_1.UserModel.findOne({ _id: username_or_id }));
            return user;
        }
        catch (error) {
            console.error(`Error retrieving user:`, error);
            res.status(500).json({ error: `Error retrieving user` });
        }
    }
    async checkErrorUpdateField(req, res, param, NorD) {
        try {
            if (param.length > 24) {
                res.status(404).json({ error: `Wrong username or id: ${param}` });
                return true;
            }
            const user = await this.getUserObject(req, res, param);
            if (!user) {
                res.status(404).json({ error: `User not found` });
                return true;
            }
            // if (NorD == `D`) {
            //   if ((req.body.is_company_admin || req.body.company) && user.role == `student`) {
            //     res.status(404).json({ error: `Cant update worker_details on student profile` });
            //     return true;
            //   }
            //   else if (req.body.string && user.role == `worker`) {
            //     res.status(404).json({ error: `Cant update student_details on worker profile` });
            //     return true;
            //   }
            //   if (req)
            // }
            return false;
        }
        catch (error) {
            console.error(`Error checking error for users:`, error);
            res.status(500).json({ error: `Error updating user` });
            return true;
        }
    }
    async validateFields(dataFields, detailType) {
        const validFields = user_model_1.IS_DETAILS[detailType];
        if (validFields) {
            return dataFields.every(field => validFields[field]);
        }
        return false;
    }
    async isValidObjectId(id) {
        return mongodb_1.ObjectId.isValid(id) && new mongodb_1.ObjectId(id).toString() === id;
    }
    // GENERAL
    async addUser(req, res) {
        try {
            const { username, password, profile_pic, role, lastname, firstname, occupation, location, contact_info, prefered_language } = req.body;
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
                res.status(409).json({ error: `User already exists with this email : ${email}` });
                return;
            }
            const existingUserUsername = await user_model_1.UserModel.findOne({ username: username });
            if (existingUserUsername) {
                res.status(409).json({ error: `User already exists with this username : ${username}` });
                return;
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const userData = { username, password: hashedPassword, profile_pic, role, email, lastname, firstname, occupation, location, contact_info, prefered_language };
            if (userData.prefered_language === 'prefered_language') {
                const validLanguages = ['fr', 'nl', 'en'];
                if (!validLanguages.includes(userData.prefered_language)) {
                    res.status(400).json({ message: 'Only fr, nl, or en can be chosen as prefered_language' });
                    return;
                }
            }
            if (role === `student`) {
                userData.student_details = {};
                userData.student_details = { ...req.body.student_details };
            }
            else if (role === `worker`) {
                userData.worker_details = {};
                userData.worker_details = { ...req.body.worker_details };
                // Ajouter logique pour mettre is_company_admin à true quand c'est le premier de la company 
            }
            userData.confirmation_token = jsonwebtoken_1.default.sign({ username: userData.username }, process.env.JWT_SECRET_EMAIL_CONFIRM, { expiresIn: '15m' });
            //mailerService.sendConfirmationEmail(userData.email, userData.username, userData.confirmation_token);
            const newUser = new user_model_1.UserModel(userData);
            await newUser.save();
            res.status(201).json({ message: `User added successfully`, user_id: newUser._id });
        }
        catch (error) {
            console.error(`Error adding user:`, error);
            res.status(500).json({ error: `Error adding user` });
        }
    }
    async confirmEmail(req, res) {
        try {
            const { token } = req.params;
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_EMAIL_CONFIRM);
            const user = await user_model_1.UserModel.findOne({ confirmation_token: token });
            if (!user) {
                res.status(400).json({ error: 'Token invalide ou expiré.' });
                return;
            }
            user.email_confirmed = true;
            user.confirmationToken = '';
            await user.save();
            res.status(200).json({ message: 'Compte confirmé avec succès !' });
        }
        catch (error) {
            res.status(400).json({ error: 'Token invalide ou expiré.' });
        }
    }
    async resendConfirmationEmail(req, res) {
        try {
            const { email } = req.params;
            const user = await user_model_1.UserModel.findOne({ email });
            if (!user) {
                res.status(404).json({ error: `Utilisateur non trouvé.` });
                return;
            }
            if (user.is_confirmed) {
                res.status(400).json({ error: `Cet utilisateur est déjà confirmé.` });
                return;
            }
            const confirmationToken = jsonwebtoken_1.default.sign({ username: user.username }, process.env.JWT_SECRET_EMAIL_CONFIRM, { expiresIn: '15m' });
            user.confirmation_token = confirmationToken;
            await user.save();
            await mailer_service_1.default.resendConfirmationEmail(user.email, user.username, confirmationToken);
            res.status(200).json({ message: 'Un nouvel email de confirmation a été envoyé.' });
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email de confirmation :', error);
            res.status(500).json({ error: 'Erreur interne du serveur.' });
        }
    }
    async getAllUsers(req, res) {
        try {
            let query = {};
            if (req.query && Object.keys(req.query).length > 0) {
                const validKeys = Object.keys(req.query).every(key => Object.keys(user_model_1.UserModel.schema.obj).includes(key));
                if (!validKeys) {
                    res.status(400).json({ error: `Invalid query parameters` });
                    return;
                }
                query = req.query;
            }
            const users = await user_model_1.UserModel.find(query);
            if (users.length === 0) {
                res.status(404).json({ message: `User not found matching those parameters` });
                return;
            }
            res.json(users);
        }
        catch (error) {
            console.error(`Error retrieving users:`, error);
            res.status(500).json({ error: `Error retrieving users` });
        }
    }
    async getUser(req, res) {
        try {
            const username_or_id = req.params.param;
            if (username_or_id.length > 24) {
                res.status(404).json({ error: `Wrong username or id: ${username_or_id}` });
                return;
            }
            const user = await this.getUserObject(req, res, username_or_id);
            if (!user) {
                res.status(404).json({ error: `No user found with this username or id: ${username_or_id}` });
                return;
            }
            res.json(user);
        }
        catch (error) {
            console.error(`Error retrieving user:`, error);
            res.status(500).json({ error: `Error retrieving user` });
        }
    }
    async getAllStudents(req, res) {
        try {
            const students = await user_model_1.UserModel.find({ role: `student` });
            if (students.length === 0) {
                res.status(404).json({ message: `No students found` });
                return;
            }
            res.status(200).json(students);
        }
        catch (error) {
            console.error(`Error retrieving students:`, error);
            res.status(500).json({ error: `Error retrieving students` });
        }
    }
    async deleteUser(req, res) {
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
            const result = await user_model_1.UserModel.deleteOne(query);
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
    async updateField(req, res, fieldToUpdate) {
        try {
            const param = req.params.param;
            const updateData = req.body;
            if (await this.checkErrorUpdateField(req, res, param, `N`) == true) {
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
            if (fieldToUpdate == `password`) {
                const hashedPassword = await bcrypt_1.default.hash(updateData.password, 10);
                updateData.password = hashedPassword;
                // Mettre logique mailer
            }
            if (fieldToUpdate == `is_active`) {
                if (updateData.is_active === false) {
                    updateData.deletion_date = Date.now();
                }
                else {
                    updateData.is_active = true;
                    updateData.deletion_date = null;
                }
            }
            if (fieldToUpdate === 'prefered_language') {
                const validLanguages = ['fr', 'nl', 'en'];
                if (!validLanguages.includes(updateData.prefered_language)) {
                    res.status(400).json({ message: 'Only fr, nl, or en can be chosen as prefered_language' });
                    return;
                }
            }
            const result = await user_model_1.UserModel.updateOne(param.length < 24 ? { username: param } : { _id: param }, updateData);
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
    async updateFields(req, res) {
        try {
            const param = req.params.param;
            const updateData = req.body;
            const allowedFields = [
                `profile_pic`, `lastname`, `firstname`, `occupation`, `location`, `prefered_language`,
                `contact_info.phone`, `contact_info.street`, `contact_info.street_number`, `contact_info.box`,
                `contact_info.city`, `contact_info.country`, `contact_info.postal_code`, `student_details.school`
            ];
            if (await this.checkErrorUpdateField(req, res, param, `N`) === true) {
                return;
            }
            const updateObject = {};
            for (const field of Object.keys(updateData)) {
                if (!allowedFields.includes(field)) {
                    res.status(400).json({ error: `Invalid field in the body, only this can be updated: ${allowedFields.join(', ')}` });
                    return;
                }
                if (field === 'prefered_language') {
                    const validLanguages = ['fr', 'nl', 'en'];
                    if (!validLanguages.includes(updateData.prefered_language)) {
                        res.status(400).json({ message: 'Only fr, nl, or en can be chosen as prefered_language' });
                        return;
                    }
                }
                updateObject[field] = updateData[field];
            }
            const userToUpdate = { [param.length < 24 ? `username` : `_id`]: param };
            const result = await user_model_1.UserModel.updateOne(userToUpdate, { $set: updateObject });
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
    async getDetails(req, res, SorW) {
        try {
            const param = req.params.param;
            if (param.length > 24) {
                res.status(404).json({ error: `Wrong username or id: ${param}` });
                return;
            }
            const user = await this.getUserObject(req, res, param);
            if (!user) {
                res.status(404).json({ error: `No user found with this username or id: ${param}` });
                return;
            }
            const user_details = user[SorW];
            if ((user.role == `student` && SorW == 'worker_details') || (user.role == `worker` && SorW == `student_details`)) {
                res.status(403).json({ error: `This field doenst exist for ${user.username} because he/she has no ${SorW}` });
                return;
            }
            if (user_details) {
                res.json(user_details);
            }
            else {
                res.status(404).json({ message: `Student not found` });
            }
        }
        catch (error) {
            console.error(`Error fetching student details:`, error);
            res.status(500).json({ error: `Internal server error` });
        }
    }
    // WORKER
    async updateWorkerIsAdmin(req, res) {
        try {
            const param = req.params.param;
            const changeAdminPerm = req.body.is_company_admin;
            const user = await this.getUserObject(req, res, param);
            if (!user) {
                res.status(404).json({ error: `User not found` });
                return;
            }
            if (user.role !== `worker` || !user.worker_details) {
                res.status(400).json({ error: `User is not a worker` });
                return;
            }
            user.worker_details.is_company_admin = changeAdminPerm;
            await user.save();
            res.json({ message: `Worker admin status updated successfully` });
        }
        catch (error) {
            console.error(`Error updating worker admin status: ${error}`);
            res.status(500).json({ error: `Error updating worker admin status` });
        }
    }
    async updateWorkerDetail(req, res, detailKey) {
        try {
            const param = req.params.param;
            const updateData = req.body;
            const updateKeys = Object.keys(updateData);
            if (updateKeys.length !== 1) {
                res.status(400).json({ error: `Only one field can be updated at a time` });
                return;
            }
            const userToUpdate = await this.getUserObject(req, res, param);
            if (!userToUpdate) {
                res.status(404).json({ error: `User not found` });
                return;
            }
            if (userToUpdate.role == `student`) {
                res.status(403).json({ error: `${userToUpdate.username} aint a worker` });
                return;
            }
            if (updateData[detailKey] === undefined) {
                res.status(400).json({ error: `Missing data for ${detailKey}` });
                return;
            }
            // if (updateData[detailKey] === `company`) {
            //   // Ajouter logique pour vérifier si elle existe déjà ou non, si elle n'existe pas, mettre le worker en admin
            // }
            const result = await user_model_1.UserModel.updateOne(param.length < 24 ? { username: param } : { _id: param }, { $set: { [`worker_details.${detailKey}`]: updateData[detailKey] } });
            if (result.modifiedCount > 0) {
                res.json({ message: `${detailKey} updated successfully` });
            }
            else {
                res.status(404).json({ error: `No changes made or worker not found` });
            }
        }
        catch (error) {
            console.error(`Error updating worker's ${detailKey}:`, error);
            res.status(500).json({ error: `Internal server error` });
        }
    }
    // STUDENT
    async updateStudentDetail(req, res, detailKey) {
        try {
            const param = req.params.param;
            const updateData = req.body;
            const updateKeys = Object.keys(updateData);
            if (updateKeys.length !== 1) {
                res.status(400).json({ error: `Only one field can be updated at a time` });
                return;
            }
            const userToUpdate = await this.getUserObject(req, res, param);
            if (!userToUpdate) {
                res.status(404).json({ error: `User not found` });
                return;
            }
            if (userToUpdate.role == `worker`) {
                res.status(403).json({ error: `${userToUpdate.username} aint a student` });
                return;
            }
            if (updateData[detailKey] === undefined) {
                res.status(400).json({ error: `Missing data for ${detailKey}` });
                return;
            }
            const result = await user_model_1.UserModel.updateOne(param.length < 24 ? { username: param } : { _id: param }, { $set: { [`student_details.${detailKey}`]: updateData[detailKey] } });
            if (result.modifiedCount > 0) {
                res.json({ message: `${detailKey} updated successfully` });
            }
            else {
                res.status(404).json({ error: `No changes made or student not found` });
            }
        }
        catch (error) {
            console.error(`Error updating student's ${detailKey}:`, error);
            res.status(500).json({ error: `Internal server error` });
        }
    }
    async updateStudentDetailArray(req, res, detailKey) {
        try {
            const param = req.params.param;
            const updateData = req.body;
            const userToUpdate = await this.getUserObject(req, res, param);
            if (!userToUpdate) {
                res.status(404).json({ error: `User not found` });
                return;
            }
            if (userToUpdate.role == `worker`) {
                res.status(403).json({ error: `${userToUpdate.username} aint a student` });
                return;
            }
            if (updateData.action == `add` || updateData.action == `update`) {
                const dataFields = Object.keys(updateData.value);
                const isValid = await this.validateFields(dataFields, detailKey);
                if (['add', 'update'].includes(updateData.action) && !isValid) {
                    res.status(400).json({ error: `Provided fields do not match the expected fields in the schema` });
                    return;
                }
            }
            if (updateData.action === 'remove' || updateData.action === 'update') {
                if (updateData.id) {
                    if (!await this.isValidObjectId(updateData.id)) {
                        res.status(400).json({ error: `Invalid ID format` });
                        return;
                    }
                }
                const itemExists = await user_model_1.UserModel.findOne({
                    [param.length < 24 ? 'username' : '_id']: param,
                    [`student_details.${detailKey}._id`]: updateData.id
                });
                if (!itemExists) {
                    res.status(404).json({ error: `Object not found with ID: ${updateData.id}` });
                    return;
                }
            }
            let updateObject = {};
            switch (updateData.action) {
                case `add`: {
                    updateObject = { $push: { [`student_details.${detailKey}`]: updateData.value } };
                    break;
                }
                case `remove`: {
                    if (!updateData.id) {
                        res.status(400).json({ error: `ID is required for remove operations` });
                        return;
                    }
                    updateObject = { $pull: { [`student_details.${detailKey}`]: { _id: updateData.id } } };
                    break;
                }
                case `update`: {
                    if (!updateData.id) {
                        res.status(400).json({ error: `ID is required for update operations` });
                        return;
                    }
                    updateObject = { $set: { [`student_details.${detailKey}.$[elem]`]: updateData.value } };
                    break;
                }
                default:
                    res.status(400).json({ error: `Invalid action specified` });
                    return;
            }
            const result = await user_model_1.UserModel.updateOne(param.length < 24 ? { username: param } : { _id: param }, updateObject, {
                arrayFilters: [{ 'elem._id': updateData.id }],
            });
            if (result.modifiedCount > 0) {
                res.json({ message: `${detailKey} details updated successfully` });
            }
            else {
                res.status(404).json({ error: `No changes made or user not found` });
            }
        }
        catch (error) {
            console.error(`Error updating ${detailKey} details:`, error);
            res.status(500).json({ error: `Internal server error` });
        }
    }
    async getLastStudents(req, res, number) {
        try {
            const students = await user_model_1.UserModel.find({ role: `student` })
                .sort({ registered_date: 1 })
                .limit(number)
                .select('username profile_pic');
            res.status(200).json(students);
        }
        catch (error) {
            console.error(`Error retrieving ${number} lasts registered students`, error);
            res.status(500).json({ error: `Error retrieving students` });
        }
    }
}
exports.default = new UserController;
