"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = require("../models/student.model");
const StudentController = {
    async addStudentProfile(req, res) {
        try {
            const studentData = req.body;
            const studentId = await student_model_1.StudentModel.addStudentProfile(studentData);
            res.status(201).json({ message: 'Profil étudiant ajouté avec succès', studentId });
        }
        catch (error) {
            console.error('Erreur lors de l\'ajout du profil étudiant :', error);
            res.status(500).json({ error: 'Erreur lors de l\'ajout du profil étudiant' });
        }
    },
    async getStudentProfiles(req, res) {
        try {
            const profiles = await student_model_1.StudentModel.getStudentProfiles();
            res.json(profiles);
        }
        catch (error) {
            console.error('Erreur lors de la récupération des profils étudiants :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des profils étudiants' });
        }
    },
};
exports.default = StudentController;
