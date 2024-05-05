import { Request, Response } from 'express';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

class UserController {
  // UTILS
  protected async findUserByUsername<T>(model: Model<T>, username: string) {
    return await model.findOne({ username });
  }

  protected async findUserById<T>(model: Model<T>, _id: string) {
    return await model.findById(_id);
  }

  protected async getUserObject<T>(model: Model<T>, username_or_id: string) {
    return (username_or_id.length < 24 ? await model.findOne({ username: username_or_id }) : await model.findById(username_or_id));
  }

  protected async getUserByUsername<T>(req: Request, res: Response, model: Model<T>, username: string): Promise<void> {
    try {
      const user = await model.findOne({ username });

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

  protected async getUserById<T>(req: Request, res: Response, model: Model<T>,  _id: string): Promise<void> {
    try {
      const user = await model.findById(_id);

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

  protected async checkErrorUpdateField<T>(req: Request, res: Response, model: Model<T>, param: string): Promise<boolean> {
    try {
      if (param.length > 24) {
        res.status(404).json({ error: `Wrong username or id: ${param}`});
        return true;
      }

      const user = await this.getUserObject(model, param);
      if (!user) {
        res.status(404).json({ message: `User not found` });
        return true;
      }

      return false;
    }
      catch (error) {
        console.error(`Error checking error for users:`, error);
        res.status(500).json({ error: `Error updating user` });
        return true;
      }
  }

  // POST
  async addUser<T>(req: Request, res: Response, Model: Model<T>): Promise<void> {
    try {
      const { username, password, profile_pic, role, email, lastname, firstname, occupation, location, contact_info } = req.body;

      if (!username || !password || !role || !email) {
        res.status(400).json({ error: 'Bad request: username, password, role, and email are required fields' });
        return;
      }

      const existingUser = await this.findUserByUsername(Model, username);

      if (existingUser) {
        res.status(400).json({ error: `User already exists` });
        return ;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userData: any = { username, password: hashedPassword, profile_pic, role, email, lastname, firstname, occupation, location, contact_info };
      
      if (req.body.role === `student`) {
        const { school, formation, experience, skills, certification, languages } = req.body;
        userData.school = school;
        userData.formation = formation;
        userData.experience = experience;
        userData.skills = skills;
        userData.certification = certification;
        userData.languages = languages;
      }
      else if (req.body.role === `worker`) {
        const { entreprise, is_admin } = req.body;
        userData.entreprise = entreprise;
        userData.is_admin = is_admin;
      }

      const newUser = new Model(userData);
      await newUser.save();

      res.status(201).json({ message: `User added successfully`, userId: newUser._id });
    }
    catch (error) {
      console.error(`Error adding user:`, error);
      res.status(500).json({ error: `Error adding user` });
    }
  }

  // GET
  async getAllUsers<T>(req: Request, res: Response, model: Model<T>): Promise<void> {
    try {
      let query = {};

      if (req.query && Object.keys(req.query).length > 0) {
        const validKeys = Object.keys(req.query).every(key => Object.keys(model.schema.obj).includes(key));
        if (!validKeys) {
          res.status(400).json({ error: 'Invalid query parameters' });
          return;
        }
        query = req.query;
      }

      const users = await model.find(query);

      if (users.length === 0) {
        res.status(404).json({ message: 'User not found matching those parameters' });
        return;
    }
      
      res.json(users);
    } 
    catch (error) {
      console.error(`Error retrieving users:`, error);
      res.status(500).json({ error: `Error retrieving users` });
    }
  }

  async getUser<T>(req: Request, res: Response, model: Model<T>): Promise<void> {
    try {
      const { param } = req.params;
      
      if (param.length < 24) {
        return (this.getUserByUsername(req, res, model, param));
      }
      else if (param.length == 24) {
        return (this.getUserById(req, res, model, param));
      }
      else {
        res.status(400).json({ message: `Impossible id/username` });
        return ;
      }
    }
    catch (error) {
      console.error(`Error retrieving user:`, error);
      res.status(500).json({ error: `Error retrieving user` });
    }
  }

  // DELETE
  async deleteUser<T>(req: Request, res: Response, model: Model<T>): Promise<void> {
    try {
      const id = req.body.id;
      const username = req.body.username;

      if ((id && username) || (!id && !username)) {
        res.status(400).json({ error: `Request must contain id OR username`});
        return ;
      }

      if ((id && id.length != 24) || (username && username.length > 23)) {
        res.status(400).json({ error: `id or username not in the good format`});
        return ;
      }

      const query: any = id ? { _id: id } : { username: username };

      const result = await model.deleteOne(query);

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

  // PUT
  async updateField<T>(req: Request, res: Response, model: Model<T>, fieldToUpdate: string): Promise<void> {
    try {
      const param = req.params.param;
      const updateData = req.body;

      if (await this.checkErrorUpdateField(req, res, model, param) == true) {
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

      const result = await model.updateOne(param.length < 24 ? { username: param } : { _id: param } , updateData);

      // Mettre la logique du mailer plus tard

      if (result.modifiedCount > 0) {
        res.json({ message: `User ${fieldToUpdate} updated successfully` });
      } 
      else {
        res.status(404).json({ error: `No changes have been made, same info as before has been given` });
      }
    }
    catch(error) {
      console.error(`Error updating user's ${fieldToUpdate}:`, error);
      res.status(500).json({ error: `Error updating user` });
    }
  }

  async updateFields<T>(req: Request, res: Response, model: Model<T>, allowedFields: Array<string>): Promise<void> {
    try {
      const param = req.params.param;
      const updateData = req.body;
    
      if (await this.checkErrorUpdateField(req, res, model, param) == true) {
        return ;
      }

      for (const field of Object.keys(updateData)) {
        if (field === `password`) {
          if (!updateData.password) {
            res.status(400).json({ error: `Password field is required` });
            return ;
          }
          const hashedPassword = await bcrypt.hash(updateData.password, 10);
        
          updateData.password = hashedPassword;
        } 
        if (!allowedFields.includes(field)) {
          res.status(400).json({ error: `Invalid field in the body, only this can be updated ${allowedFields}`});
          return ;
        }
      } 
       // Mettre la logique du mailer plus tard
      
      const result = await model.updateOne(param.length < 24 ? { username: param } : { _id: param }, updateData);
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
}

export default UserController;