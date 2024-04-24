import { Request, Response } from 'express';
import { StudentModel, StudentProfile } from '../models/student.model';

const StudentController = {
  async addStudentProfile(req: Request, res: Response): Promise<void> {
    try {
      const studentData: StudentProfile = req.body;
      const studentId: string = await StudentModel.addStudentProfile(studentData);

      res.status(201).json({ message: 'Profil étudiant ajouté avec succès', studentId });
    } 
    catch (error) {
      console.error('Erreur lors de l\'ajout du profil étudiant :', error);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du profil étudiant' });
    }
  },
  async getStudentProfiles(req: Request, res: Response): Promise<void> {
    try {
      const profiles = await StudentModel.getStudentProfiles();

      res.json(profiles);
    } 
    catch (error) {
      console.error('Erreur lors de la récupération des profils étudiants :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des profils étudiants' });
    }
  },
};

export default StudentController;
