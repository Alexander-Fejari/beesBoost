"use strict";
// import { Request, Response } from 'express';
// import { EnterpriseModel, EnterpriseProfile } from '../models/enterprise.model';
// const EnterpriseController = {
//   async addEnterpriseProfile(req: Request, res: Response): Promise<void> {
//     try {
//       const enterpriseData: EnterpriseProfile = req.body;
//       const enterpriseId: string = await EnterpriseModel.addEnterpriseProfile(enterpriseData);
//       res.status(201).json({ message: 'Profil étudiant ajouté avec succès', enterpriseId });
//     } 
//     catch (error) {
//       console.error('Erreur lors de l\'ajout du profil étudiant :', error);
//       res.status(500).json({ error: 'Erreur lors de l\'ajout du profil étudiant' });
//     }
//   },
//   async getEnterpriseProfiles(req: Request, res: Response): Promise<void> {
//     try {
//       const profiles = await EnterpriseModel.getEnterpriseProfiles();
//       res.json(profiles);
//     } 
//     catch (error) {
//       console.error('Erreur lors de la récupération des profils étudiants :', error);
//       res.status(500).json({ error: 'Erreur lors de la récupération des profils étudiants' });
//     }
//   },
// };
// export default EnterpriseController;
