import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';

class UserController {
  // UTILS
  protected async getUserObject(req: Request, res: Response, username_or_id: string) {
    try {
      const user = (username_or_id.length < 24 ? await UserModel.findOne({ username: username_or_id }) : await UserModel.findOne({ _id: username_or_id}));
      return user;
    }
    catch (error) {
      console.error(`Error retrieving user:`, error);
      res.status(500).json({ error: `Error retrieving user` });
    }
  }

  protected async checkErrorUpdateField(req: Request, res: Response, param: string): Promise<boolean> {
    try {
      if (param.length > 24) {
        res.status(404).json({ error: `Wrong username or id: ${param}`});
        return true;
      }

      const user = await this.getUserObject(req, res, param);
      if (!user) {
        res.status(404).json({ error: `User not found` });
        return true;
      }

      if (req.body.worker_details && user.role == `student`) {
        res.status(404).json({ error: `Cant update worker_details on student profile` });
        return true;
      }
      else if (req.body.student_details && user.role == `worker`) {
        res.status(404).json({ error: `Cant update student_details on worker profile` });
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
  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, profile_pic, role, email, lastname, firstname, occupation, location, contact_info } = req.body;

      if (!username || !password || !role || !email) {
        res.status(400).json({ error: 'Bad request: username, password, role, and email are required fields' });
        return;
      }
      const roles = [`student`, `worker`, `admin`, `superAdmin`];
      if (!roles.includes(role)) {
        res.status(400).json({ error: `${role} isnt a good role (student, worker, admin or superAdmin)` });
        return ;
      }

      const existingUser = await UserModel.findOne({ username: username });

      if (existingUser) {
        res.status(400).json({ error: `User already exists` });
        return ;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userData: any = { username, password: hashedPassword, profile_pic, role, email, lastname, firstname, occupation, location, contact_info };
     
      if (req.body.role === `student`) {
        userData.student_details = {};
        const { student_details } = req.body;
        if (student_details) {
        userData.student_details.school = student_details.school;
        userData.student_details.formation = student_details.formation;
        userData.student_details.experience = student_details.experience;
        userData.student_details.skills = student_details.skills;
        userData.student_details.certification = student_details.certification;
        userData.student_details.languages = student_details.languages;
        userData.student_details.game_info = student_details.game_info; 
        }
      }
      else if (req.body.role === `worker`) {
        userData.worker_details = {};
        const { worker_details } = req.body;
        if (worker_details) {
          userData.worker_details.company = worker_details.company;
          userData.worker_details.is_company_admin = worker_details.is_company_admin;
        } 
        // Ajouter logique pour mettre admin si premier à créer la société quand company sera fait, peut aussi être fait ailleurs (dans la fonction qui vérifie par exemple)
      }

      const newUser = new UserModel(userData);
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
        const validKeys = Object.keys(req.query).every(key => Object.keys(UserModel.schema.obj).includes(key));
        if (!validKeys) {
          res.status(400).json({ error: 'Invalid query parameters' });
          return ;
        }
        query = req.query;
      }

      const users = await UserModel.find(query);

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

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const username_or_id = req.params.param;
      if (username_or_id.length > 24) {
        res.status(404).json({ error: `Wrong username or id: ${username_or_id}`});
        return ;
      }

      const user = await this.getUserObject(req, res, username_or_id);
      if (!user) {
        res.status(404).json({ error: `No user found with this username or id: ${username_or_id}` });
        return ;
      }
      res.json(user);
    }
    catch (error) {
      console.error(`Error retrieving user:`, error);
      res.status(500).json({ error: `Error retrieving user` });
    }
  }
  
  async getAllStudents(req: Request, res: Response, studentOrWorker: string): Promise<void> {
    try {
        let query: any = { role: studentOrWorker };  // Start with a role-based query.

        // Handle query parameters with flexibility for nested fields
        if (req.query && Object.keys(req.query).length > 0) {
            query = Object.entries(req.query).reduce((acc: any, [key, value]: [string, any]) => {
                const nestedFields = ['school', 'skills', 'certification', 'languages', 'experience', 'formation'];
                if (nestedFields.some(field => key.startsWith(field))) {
                    // Directly apply nested structure in query
                    acc[`student_details.${key}`] = value;
                } else if (key in UserModel.schema.obj || (UserModel.schema.obj.student_details && Object.keys(UserModel.schema.obj.student_details as object).includes(key))) {
                    // Apply directly if it's a recognized field in the schema or in student_details
                    acc[`student_details.${key}`] = value;
                } else {
                    res.status(400).json({ error: `Invalid query parameter: ${key}` });
                    return acc; // Return accumulated query so far to exit
                }
                return acc;
            }, query);
        }

        const users = await UserModel.find(query);
        if (users.length === 0) {
            res.status(404).json({ message: 'No students found matching those parameters' });
            return;
        }

        // Flatten the student details into the root of the user object and handle renaming to avoid clashes
        const students = users.map(user => {
            const student: any = user.toObject();

            // Function to rename and merge specific fields to avoid naming conflicts
            const renameAndMerge = (field: string, prefix: string): void => {
                if (student.student_details && student.student_details[field]) {
                    student[prefix + '_' + field] = student.student_details[field];
                    delete student.student_details[field];
                }
            };

            // Execute renaming for each necessary field
            renameAndMerge('school', 'student');
            renameAndMerge('skills', 'student');
            renameAndMerge('certification', 'student_cert');
            renameAndMerge('languages', 'student_lang');
            renameAndMerge('experience', 'student_exp');
            renameAndMerge('formation', 'student_form');

            // Remove the now-empty student_details if it's completely emptied
            if (student.student_details && Object.keys(student.student_details).length === 0) {
                delete student.student_details;
            }

            return student;
        });

        res.json(students);
    } catch (error) {
        console.error(`Error retrieving students:`, error);
        res.status(500).json({ error: `Error retrieving students` });
    }
}
  


  // async getAllSW(req: Request, res: Response, studentOrWorker: string): Promise<void> {
  //   try {
  //     let query: any = { role: studentOrWorker };

  //     if (req.query && Object.keys(req.query).length > 0) {
  //       for (const key of Object.keys(req.query)) {
  //         if (
  //           Object.keys(UserModel.schema.obj.student_details).includes(key) ||
  //           key === 'school'
  //         ) {
  //           query[key] = req.query[key];
  //         } 
  //         else {
  //           res.status(400).json({ error: `Invalid query parameter: ${key}` });
  //           return;
  //         }
  //       }
  //     }

  //     const students = await UserModel.find(query);

  //     if (students.length === 0) {
  //         res.status(404).json({ message: 'No students found matching those parameters' });
  //         return;
  //     }

  //     res.json(students);
  //   } 
  //   catch (error) {
  //     console.error(`Error retrieving students:`, error);
  //     res.status(500).json({ error: `Error retrieving students` });
  //   }
  // }

  // DELETE
  async deleteUser(req: Request, res: Response): Promise<void> {
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

      const result = await UserModel.deleteOne(query);

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
  async updateField(req: Request, res: Response, fieldToUpdate: string): Promise<void> {
    try {
      const param = req.params.param;
      const updateData = req.body;

      if (await this.checkErrorUpdateField(req, res, param) == true) {
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

      if (fieldToUpdate == `password`) {
        const hashedPassword = await bcrypt.hash(updateData.password, 10);
      
        updateData.password = hashedPassword;
      }

      const result = await UserModel.updateOne(param.length < 24 ? { username: param } : { _id: param } , updateData);

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

  async updateFields(req: Request, res: Response, allowedFields: Array<string>): Promise<void> {
    try {
      const param = req.params.param;
      const updateData = req.body;
    
      if (await this.checkErrorUpdateField(req, res, param) == true) {
        return ;
      }

      for (const field of Object.keys(updateData)) {
        if (!allowedFields.includes(field)) {
          res.status(400).json({ error: `Invalid field in the body, only this can be updated ${allowedFields}`});
          return ;
        }
      } 
       // Mettre la logique du mailer plus tard
      
      const result = await UserModel.updateOne(param.length < 24 ? { username: param } : { _id: param }, updateData);
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

  async updateWorkerIsAdmin(req: Request, res: Response): Promise<void> {
    try {
      const param = req.params.param;
      const changeAdminPerm = req.body.is_company_admin;
  
      const user = await this.getUserObject(req, res, param);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return ;
      }

      if (user.role !== 'worker' || !user.worker_details) {
        res.status(400).json({ error: 'User is not a worker' });
        return ;
      }
  
      user.worker_details.is_company_admin = changeAdminPerm;
      await user.save();
  
      res.json({ message: 'Worker admin status updated successfully' });
    } catch (error) {
      console.error('Error updating worker admin status:', error);
      res.status(500).json({ error: 'Error updating worker admin status' });
    }
  }

  async updateStudentDetails(req: Request, res: Response): Promise<void> {
    try {
      const param = req.params.param;
      //const updateData = req.body;
  
      const user = await this.getUserObject(req, res, param);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return ;
      }
  
      // I need u here
  
      res.json({ message: 'Student details updated successfully' });
    } catch (error) {
      console.error('Error updating student details:', error);
      res.status(500).json({ error: 'Error updating student details' });
    }
  }
}

export default UserController;