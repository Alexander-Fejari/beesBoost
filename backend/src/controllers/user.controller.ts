import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/user.model';

class UserController {
  private static async findUserByUsername(username: string){
    return await UserModel.findOne({ username });
  }

  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, profile_pic, role, email } = req.body as IUser;
      const newUser = new UserModel({ username, profile_pic, role, email });
      await newUser.save();

      res.status(201).json({ message: `User added successfully`, userId: newUser._id });
    }
    catch (error) {
      console.error(`Error adding user:`, error);
      res.status(500).json({ error: `Error adding user` });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.find({});
      
      res.json(users);
    } 
    catch (error) {
      console.error(`Error retrieving users:`, error);
      res.status(500).json({ error: `Error retrieving users` });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;
      const user = await UserModel.findOne({ username });

      if (!user) {
        res.status(404).json({ message: `User not found` });
        return ;
      }
      res.json(user);
    }
    catch (error) {
      console.error(`Error retrieving user:`, error);
      res.status(500).json({ error: `Error retrieving user` });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.body;
      const result = await UserModel.deleteOne({ username });

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

  async updateField(req: Request, res: Response, fieldToUpdate: string): Promise<void> {
    try {
      const { username } = req.params;
      const updateData = req.body;

      const user = await UserController.findUserByUsername(username);
      if (!user) {
        res.status(404).json({ message: `User not found` });
        return ;
      }
      // Check if the field is updatable
      const allowedFields = [`profile_pic`, `password`, `email`, `is_verified`, `is_active`];
      if (!allowedFields.includes(fieldToUpdate)) {
        res.status(400).json({ error: `Invalid field '${fieldToUpdate}'` });
        return ;
      }

      // Check if there is only one field to update
      if (Object.keys(updateData.length !== 1) || !(fieldToUpdate in updateData)) {
        res.status(400).json({ error: `Only the ${fieldToUpdate} can be updated` });
        return ;
      }

      await UserModel.updateOne({ username }, updateData);

      // Mettre la logique du mailer plus tard

      res.json({ message: `User ${fieldToUpdate} updated successfully` });
    }
    catch(error) {
      console.error(`Error updating user's ${fieldToUpdate}:`, error);
      res.status(500).json({ error: `Error updating user` });
    }
  }

  async updateProfilePicture(req: Request, res: Response): Promise<void> {
    await this.updateField(req, res, 'profile_pic');
  }

  async updateIsVerified(req: Request, res: Response): Promise<void> {
    await this.updateField(req, res, 'is_verified');
  }

  async updateIsActive(req: Request, res: Response): Promise<void> {
    await this.updateField(req, res, 'is_active');
  }

  async updatePassword(req: Request, res: Response): Promise<void> {
    await this.updateField(req, res, 'password');
  }

  async updateEmail(req: Request, res: Response): Promise<void> {
    await this.updateField(req, res, 'email');
  }

  // async updateProfilePicture(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { username } = req.params;
  //     const updateData = req.body;

  //     if (Object.keys(updateData).length !== 1 || !('profile_pic' in updateData)) {
  //       res.status(400).json({ error: `Only the profile picture can be updated` });
  //       return;
  //     }
      
  //     const user = await UserModel.findOne({ username });

  //     if (!user) {
  //       res.status(404).json({ message: 'User not found' });
  //       return ;
  //     }

  //     await UserModel.updateOne({ username }, updateData);

  //     res.json({ message: 'User updated successfully' });
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //     res.status(500).json({ error: 'Error updating user' });
  //   }
  // }

  // async updateIsVerifiedIsActive(req: Request, res: Response): Promise<void> {
  //   try {
  //     const updateData = req.body;
  //     const username = updateData.username;

  //     // Condition
  //     const allowedFields = ['is_active', 'is_verified'];
  //     for (const field of Object.keys(updateData)) {
  //       if (!allowedFields.includes(field)) {
  //         res.status(400).json({ error: `Field '${field}' cannot be updated` });
  //         return;
  //       }
  //     }

  //     const user = await UserModel.findOne({ username });

  //     if (!user) {
  //       res.status(404).json({ message: 'User not found' });
  //       return ;
  //     }

  //     await UserModel.updateOne({ username }, updateData);

  //     // Ajouter logique Mailer

  //     res.json({ message: 'User updated successfully' });
  //   }
  //   catch (error) {
  //     console.error('Error updating user:', error);
  //     res.status(500).json({ error: 'Error updating user'}); 
  //   }
  // }

  // async updatePassword(req: Request, res: Response): Promise<void> {
  //   try {
  //     const updateData = req.body;
  //     const username = updateData.username;

  //     // Condition
  //     if (Object.keys(updateData).length !== 1 || !('password' in updateData)) {
  //       res.status(400).json({ error: `Only the password can be updated` });
  //       return;
  //     }

  //     const user = await UserModel.findOne({ username });

  //     if (!user) {
  //       res.status(404).json({ message: 'User not found' });
  //       return ;
  //     }

  //     await UserModel.updateOne({ username }, updateData);

  //     // Ajouter logique avec le mailer

  //     res.json({ message: 'User updated successfully' });
  //   }
  //   catch (error) {
  //     console.error('Error updating user:', error);
  //     res.status(500).json({ error: 'Error updating user'}); 
  //   }
  // }

  // async updateEmail(req: Request, res: Response): Promise<void> {
  //   try {
  //     const updateData = req.body;
  //     const username = updateData.username;

  //     // Condition
  //     if (Object.keys(updateData).length !== 1 || !('email' in updateData)) {
  //       res.status(400).json({ error: `Only the email address can be updated` });
  //       return;
  //     }

  //     const user = await UserModel.findOne({ username });

  //     if (!user) {
  //       res.status(404).json({ message: 'User not found' });
  //       return ;
  //     }

  //     await UserModel.updateOne({ username }, updateData);

  //     // Ajouter logique avec le mailer

  //     res.json({ message: 'User updated successfully' });
  //   }
  //   catch (error) {
  //     console.error('Error updating user:', error);
  //     res.status(500).json({ error: 'Error updating user'}); 
  //   }
  // }
}

export default UserController;