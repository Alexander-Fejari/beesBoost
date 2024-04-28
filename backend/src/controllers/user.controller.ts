import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/user.model';

class UserController {
  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, profile_pic, role, email } = req.body as IUser;
      const newUser = new UserModel({ username, profile_pic, role, email });
      await newUser.save();

      res.status(201).json({ message: 'User added successfully', userId: newUser._id });
    }
    catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Error adding user' });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.find({});
      
      res.json(users);
    } 
    catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Error retrieving users' });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;

      const user = await UserModel.findOne({ username });

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

export default UserController;