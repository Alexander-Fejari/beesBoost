"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enterprise_model_1 = require("../models/enterprise.model");
const EnterpriseController = {
    async addEnterpriseProfile(req, res) {
        try {
            const enterpriseData = req.body;
            const enterpriseId = await enterprise_model_1.EnterpriseModel.addEnterpriseProfile(enterpriseData);
            res.status(201).json({ message: 'Profil étudiant ajouté avec succès', enterpriseId });
        }
        catch (error) {
            console.error('Erreur lors de l\'ajout du profil étudiant :', error);
            res.status(500).json({ error: 'Erreur lors de l\'ajout du profil étudiant' });
        }
    },
    async getEnterpriseProfiles(req, res) {
        try {
            const profiles = await enterprise_model_1.EnterpriseModel.getEnterpriseProfiles();
            res.json(profiles);
        }
        catch (error) {
            console.error('Erreur lors de la récupération des profils étudiants :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des profils étudiants' });
        }
    },
};
exports.default = EnterpriseController;
