"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const UserController = {
    async addUser(req, res) {
        try {
            const { username, profile_pic, role, email } = req.body;
            const userData = { username, profile_pic, role, email };
            const userId = await user_model_1.UserModel.addUser(userData);
            res.status(201).json({ message: 'Utilisateur ajouté avec succès', userId });
        }
        catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
        }
    },
    async getUsers(req, res) {
        try {
            const users = await user_model_1.UserModel.getUsers();
            res.json(users);
        }
        catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        }
    },
};
exports.default = UserController;
