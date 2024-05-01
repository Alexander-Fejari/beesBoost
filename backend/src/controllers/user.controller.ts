import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/user.model';
import bcrypt from 'bcrypt';


class UserController {
  
  // UTILS
  private static async findUserByUsername(username: string){
    return await UserModel.findOne({ username });
  }

  // private static async findUserById(_id: string){
  //   return await UserModel.findOne({ _id });
  // }

  // POST
  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, profile_pic, role, email } = req.body as IUser;

      const existingUser = await UserController.findUserByUsername(username);

      if (existingUser) {
        res.status(400).json({ error: `User already exists` });
        return ;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({ username, password: hashedPassword, profile_pic, role, email });
      await newUser.save();

      res.status(201).json({ message: `User added successfully`, userId: newUser._id });
    }
    catch (error) {
      console.error(`Error adding user:`, error);
      res.status(500).json({ error: `Error adding user` });
    }
  }

  // GET
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      let query = {};

      if (req.query && Object.keys(req.query).length > 0) {
        query = req.query;
      }

      const users = await UserModel.find(query);
      
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

  // DELETE
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

  // PUT
  async updateField(req: Request, res: Response, fieldToUpdate: string): Promise<void> {
    try {
      const { username } = req.params;
      //const { _id } = req.params;
      const updateData = req.body;

      // Check if user exists
      const user = await UserController.findUserByUsername(username);
      if (!user) {
        res.status(404).json({ message: `User not found` });
        return ;
      }

      // Check if the field is updatable
      const allowedFields = [`username`, `password`, `profile_pic`, `email`, `is_verified`, `is_active`];
      if (!allowedFields.includes(fieldToUpdate)) {
        res.status(400).json({ error: `Invalid field '${fieldToUpdate}'` });
        return ;
      }

      // Check if there is only one field to update
      if (Object.keys(updateData).length !== 1) {
        if (Object.keys(updateData).length === 0) {
          res.status(400).json({ error: `Empty request : Need ${ fieldToUpdate }` });
          return ;
        }
        res.status(400).json({ error: `Only one field (${ fieldToUpdate }) can be updated at a time` });
        return ;
      }

      // Check if its the good field to update
      if (!(fieldToUpdate in updateData)) {
        res.status(400).json({ error: `Only the ${fieldToUpdate} can be updated` });
        return ;
      }

      // Encrypt the password if needed
      if (fieldToUpdate === `password`) {
        if (!updateData.password) {
          res.status(400).json({ error: `Password field is required` });
          return ;
        }
        const hashedPassword = await bcrypt.hash(updateData.password, 10);
        
        updateData.password = hashedPassword;
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

  async updateUsername(req: Request, res: Response): Promise<void> {
    await this.updateField(req, res, `username`);
  }
}

export default UserController;