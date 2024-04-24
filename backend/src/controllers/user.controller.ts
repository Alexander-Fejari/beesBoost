import { Request, Response } from 'express';
import { UserModel, User } from '../models/user.model';

const UserController = {
  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, profile_pic, role, email } = req.body as User;
      const userData: User = { username, profile_pic, role, email };
      const userId: string = await UserModel.addUser(userData);

      res.status(201).json({ message: 'Utilisateur ajouté avec succès', userId });
    } 
    catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
    }
  },
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.getUsers();
      
      res.json(users);
    } 
    catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
  },
};

export default UserController;
