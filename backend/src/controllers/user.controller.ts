import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel, ISDetails, IWDetails, IS_DETAILS } from '../models/user.model';
import { ObjectId } from 'mongodb';
import mailerService from '../services/mailer.service';
import jwt from 'jsonwebtoken';
import { CompanyModel } from '../models/company.model';

class UserController {
  // UTILS
  async getUserObject(req: Request, res: Response, username_or_id: string) {
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

      return false;
    }
      catch (error) {
        console.error(`Error checking error for users:`, error);
        res.status(500).json({ error: `Error updating user` });
        return true;
      }
  }

  protected async validateFields(dataFields: string[], detailType: keyof ISDetails): Promise<boolean> {
    const validFields = IS_DETAILS[detailType];
    if (validFields) {
      return dataFields.every(field => validFields[field]);
    }
    return false;
  }

  async isValidObjectId(id: string): Promise<boolean> {
    return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
  }

  protected async responseUpdatedroutes(req: Request, res: Response, param: string, fieldToShow: string): Promise<void> {
    const updatedUser = await this.getUserObject(req, res, param);
    switch (fieldToShow) {
      case `wd`: {
        res.json(updatedUser!.worker_details);
        break ;
      }
      case `sd`: {
        res.json(updatedUser!.student_details);
        break ;
      }
      default: res.json(updatedUser);
    }
  }

  // GENERAL
  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, profile_pic, role, lastname, firstname, occupation, location, contact_info, prefered_language } = req.body;
      let { email } = req.body;
      
      email = email.toLowerCase();

      if (!username || !password || !role || !email) {
        res.status(400).json({ error: `Bad request: username, password, role, and email are required fields` });
        return;
      }

      const roles = [`student`, `worker`, `admin`, `superAdmin`];
      if (!roles.includes(role)) {
        res.status(400).json({ error: `${role} isnt a good role (student, worker, admin or superAdmin)` });
        return ;
      }

      const existingUserEmail = await UserModel.findOne({ email: email });

      if (existingUserEmail) {
        res.status(409).json({ error: `User already exists with this email : ${ email }` });
        return ;
      }

      const existingUserUsername = await UserModel.findOne({ username: username });

      if (existingUserUsername) {
        res.status(409).json({ error: `User already exists with this username : ${ username }` });
        return ;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userData: any = { username, password: hashedPassword, profile_pic, role, email, lastname, firstname, occupation, location, contact_info, prefered_language };
     
      if (userData.prefered_language === 'prefered_language') {
        const validLanguages = ['fr', 'nl', 'en'];
        if (!validLanguages.includes(userData.prefered_language)) {
          res.status(400).json({ message: 'Only fr, nl, or en can be chosen as prefered_language' });
          return;
        }
      }

      if (role === `student`) {
        userData.student_details = {};
        userData.student_details = { ...req.body.student_details };
      } 
      else if (role === `worker`) {
        userData.worker_details = {};
        userData.worker_details = { ...req.body.worker_details };
      }

      userData.confirmation_token = jwt.sign({ username: userData.username }, process.env.JWT_SECRET_EMAIL_CONFIRM!, { expiresIn: '15m' });

      //mailerService.sendConfirmationEmail(userData.email, userData.username, userData.confirmation_token);

      const newUser = new UserModel(userData);
      await newUser.save();

      res.status(201).json(newUser);
    }
    catch (error) {
      console.error(`Error adding user:`, error);
      res.status(500).json({ error: `Error adding user` });
    }
  }

  async confirmEmail(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      
      jwt.verify(token, process.env.JWT_SECRET_EMAIL_CONFIRM!) as { username: string };
      const user = await UserModel.findOne({ confirmation_token: token });

      if (!user) {
        res.status(400).json({ error: 'Token invalide ou expiré.' });
        return;
      }

      user.email_confirmed = true;
      user.confirmationToken = '';
      await user.save();

      res.status(200).json({ message: 'Compte confirmé avec succès !' });
    } catch (error) {
      res.status(400).json({ error: 'Token invalide ou expiré.' });
    }
  }

  async resendConfirmationEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      
      const user = await UserModel.findOne({ email });

      if (!user) {
        res.status(404).json({ error: `Utilisateur non trouvé.` });
        return ;
      }

      if (user.is_confirmed) {
        res.status(400).json({ error: `Cet utilisateur est déjà confirmé.` });
        return ;
      }

      const confirmationToken = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET_EMAIL_CONFIRM!,
        { expiresIn: '15m' }
      );
      user.confirmation_token = confirmationToken;

      await user.save();

      await mailerService.resendConfirmationEmail(user.email, user.username, confirmationToken);

      res.status(200).json({ message: 'Un nouvel email de confirmation a été envoyé.' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de confirmation :', error);
      res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      let query = {};

      if (req.query && Object.keys(req.query).length > 0) {
        const validKeys = Object.keys(req.query).every(key => Object.keys(UserModel.schema.obj).includes(key));
        if (!validKeys) {
          res.status(400).json({ error: `Invalid query parameters` });
          return ;
        }
        query = req.query;
      }

      const users = await UserModel.find(query);

      if (users.length === 0) {
        res.status(404).json({ message: `User not found matching those parameters` });
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
  
  async getAllStudents(req: Request, res: Response): Promise<void> {
    try {
      const students = await UserModel.find({ role: `student` });

      if (students.length === 0) {
          res.status(404).json({ message: `No students found` });
          return;
      }

      res.status(200).json(students);
    }
    catch (error) {
      console.error(`Error retrieving students:`, error);
      res.status(500).json({ error: `Error retrieving students` });
    }
  }

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

      if (fieldToUpdate == `is_active`) {
        if (updateData.is_active === false) {
          updateData.deletion_date = Date.now();
        }
        else {
          updateData.is_active = true;
          updateData.deletion_date = null;
        }
      }

      if (fieldToUpdate === 'prefered_language') {
        const validLanguages = ['fr', 'nl', 'en'];
        if (!validLanguages.includes(updateData.prefered_language)) {
          res.status(400).json({ message: 'Only fr, nl, or en can be chosen as prefered_language' });
          return;
        }
      }

      const result = await UserModel.updateOne(param.length < 24 ? { username: param } : { _id: param } , updateData);

      if (result.modifiedCount > 0) {
        return this.responseUpdatedroutes(req, res, param, 'n');
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

  async updateFields(req: Request, res: Response): Promise<void> {
    try {
      const param = req.params.param;
      const updateData = req.body;
    
      const allowedFields: string[] = [
        `profile_pic`, `lastname`, `firstname`, `occupation`, `location`, `prefered_language`,
        `contact_info.phone`, `contact_info.street`, `contact_info.street_number`, `contact_info.box`,
        `contact_info.city`, `contact_info.country`, `contact_info.postal_code`, `student_details.school`,
        `description`, `pick_up_line`
      ];

      if (await this.checkErrorUpdateField(req, res, param) === true) {
        return ;
      }

      const updateObject: { [key: string]: any } = {};
      for (const field of Object.keys(updateData)) {
        if (!allowedFields.includes(field)) {
          res.status(400).json({ error: `Invalid field in the body, only this can be updated: ${allowedFields.join(', ')}` });
          return ;
        }
        if (field === 'prefered_language') {
          const validLanguages = ['fr', 'nl', 'en'];
          if (!validLanguages.includes(updateData.prefered_language)) {
            res.status(400).json({ message: 'Only fr, nl, or en can be chosen as prefered_language' });
            return;
          }
        }
        updateObject[field] = updateData[field];
      }
      
      const userToUpdate = { [param.length < 24 ? `username` : `_id`]: param };
      
      const result = await UserModel.updateOne(userToUpdate, { $set: updateObject });
      if (result.modifiedCount > 0) {
        return this.responseUpdatedroutes(req, res, param, 'n');
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

  async updateProfilePic(req: Request, res: Response): Promise<void> {
    try {
      const param = req.params.param;
      const file = req.file;
      const { link } = req.body;

      const user = await this.getUserObject(req, res, param);

      if (!user) {
        res.status(404).json({ error: `User not found` });
        return;
      }

      if (file) {
        user.profile_pic = file.path;
      } 
      else if (link) {
        user.profile_pic = link;
      } 
      else {
        res.status(400).json({ error: `No file or link provided` });
        return ;
      }

      await user.save();

      res.json({ message: `Profile picture updated successfully`, profile_pic: user.profile_pic });
    } 
    catch (error) {
      console.error(`Error updating profile picture:`, error);
      res.status(500).json({ error: `Internal server error` });
    }
  }

  async getDetails(req: Request, res: Response, SorW: string): Promise<void> {
    try {
      const param = req.params.param;

      if (param.length > 24) {
        res.status(404).json({ error: `Wrong username or id: ${param}`});
        return ;
      }
      const user = await this.getUserObject(req, res, param);

      if (!user) {
        res.status(404).json({ error: `No user found with this username or id: ${param}` });
        return ;
      }

      const user_details = user[SorW] as any;

      if ((user.role == `student` && SorW == 'worker_details') || (user.role == `worker` && SorW == `student_details`)) {
        res.status(403).json({ error: `This field doenst exist for ${user.username} because he/she has no ${SorW}` });
        return ;
      }

      if (user_details) {
        res.json(user_details);
      } 
      else {
        res.status(404).json({ message: `Student not found` });
      }
    } 
    catch (error) {
      console.error(`Error fetching student details:`, error);
      res.status(500).json({ error: `Internal server error` });
    }
  }

  // WORKER
  async updateWorkerIsAdmin(req: Request, res: Response): Promise<void> {
    try {
      const param = req.params.param;
      const changeAdminPerm = req.body.is_company_admin;
  
      const user = await this.getUserObject(req, res, param);
      if (!user) {
        res.status(404).json({ error: `User not found` });
        return ;
      }

      if (user.role !== `worker` || !user.worker_details) {
        res.status(400).json({ error: `User is not a worker` });
        return ;
      }

      if (user.worker_details.is_company_admin != changeAdminPerm) {
        user.worker_details.is_company_admin = changeAdminPerm;
        await user.save();
        res.json(user.worker_details);
      }
      else {
        res.status(400).json({ error: `User is already ${changeAdminPerm ? 'an admin' : 'not an admin' } ` });
      }
    } 
    catch (error) {
      console.error(`Error updating worker admin status: ${error}`);
      res.status(500).json({ error: `Error updating worker admin status` });
    }
  }

  async updateWorkerDetail(req: Request, res: Response, detailKey: keyof IWDetails): Promise<void> {
    try {
      const param = req.params.param;
      const updateData = req.body;

      const updateKeys = Object.keys(updateData);
      if (updateKeys.length !== 1) {
        res.status(400).json({ error: `Only one field can be updated at a time` });
        return ;
      }

      const userToUpdate = await this.getUserObject(req, res, param);

      if (!userToUpdate) {
        res.status(404).json({ error: `User not found` });
        return ;
      }
      if (userToUpdate.role == `student`) {
        res.status(403).json({ error: `${userToUpdate.username} aint a worker`});
        return ;
      }
      if (updateData[detailKey] === undefined) {
        res.status(400).json({ error: `Missing data for ${detailKey}` });
        return ;
      }

      if (updateData.company && updateData.company != userToUpdate.worker_details?.company) {
        let companyFound = await CompanyModel.findOne({ name: updateData.company });
        if (!companyFound) {
          companyFound = new CompanyModel({ name: updateData.company, admins: [userToUpdate.username], worker: [userToUpdate.username] });
          if (userToUpdate.worker_details) {
            userToUpdate.worker_details.is_company_admin = true;
          }
        }
        else {
          companyFound.worker?.push(userToUpdate.username);
          if (userToUpdate.worker_details) {
            userToUpdate.worker_details.is_company_admin = false;
          }
        }
        await companyFound.save();
      }
      else {
        res.status(400).json(`Worker cant rejoin the same company`);
        return ;
      }

      await userToUpdate.save();
      res.json(userToUpdate.worker_details);
    } 
    catch (error) {
      console.error(`Error updating worker's ${detailKey}:`, error);
      res.status(500).json({ error: `Internal server error` });
    }
  }

  // STUDENT
  async updateStudentDetail(req: Request, res: Response, detailKey: keyof ISDetails): Promise<void> {
    try {
      const param = req.params.param;
      const updateData = req.body;

      const updateKeys = Object.keys(updateData);
      if (updateKeys.length !== 1) {
        res.status(400).json({ error: `Only one field can be updated at a time` });
        return ;
      }

      const userToUpdate = await this.getUserObject(req, res, param);

      if (!userToUpdate) {
        res.status(404).json({ error: `User not found` });
        return ;
      }
      if (userToUpdate.role == `worker`) {
        res.status(403).json({ error: `${userToUpdate.username} aint a student`});
        return ;
      }
      if (updateData[detailKey] === undefined) {
        res.status(400).json({ error: `Missing data for ${detailKey}` });
        return ;
      }

      if (!userToUpdate.student_details) {
        userToUpdate.student_details = {} as ISDetails;
      }
  
      if (updateData[detailKey] === userToUpdate.student_details[detailKey]) {
        res.status(400).json({ error: `The provided value for ${detailKey} is the same as the current value` });
        return;
      }
  
      userToUpdate.student_details[detailKey] = updateData[detailKey];
      await userToUpdate.save();
  
      res.json(userToUpdate.student_details);
    } catch (error) {
      console.error(`Error updating student's ${detailKey}:`, error);
      res.status(500).json({ error: `Internal server error` });
    }
  }

  async updateStudentDetailArray<T extends keyof ISDetails>(req: Request, res: Response, detailKey: T): Promise<void> {
    try {
      const param = req.params.param;
      const updateData: { action: string; id?: string; value?: any } = req.body; 
        
      const userToUpdate = await this.getUserObject(req, res, param);

      if (!userToUpdate) {
        res.status(404).json({ error: `User not found` });
        return ;
      }

      if (userToUpdate.role == `worker`) {
        res.status(403).json({ error: `${userToUpdate.username} aint a student`});
        return ;
      }

      if (updateData.action == `add` || updateData.action == `update`) {
        const dataFields = Object.keys(updateData.value);
        const isValid = await this.validateFields(dataFields, detailKey);

        if (['add', 'update'].includes(updateData.action) && !isValid) {
            res.status(400).json({ error: `Provided fields do not match the expected fields in the schema` });
            return;
        }
      }

      if (updateData.action === 'remove' || updateData.action === 'update') {
        if (updateData.id) {
          if (! await this.isValidObjectId(updateData.id)) {
            res.status(400).json({ error: `Invalid ID format` });
            return ;
          }
        }
        const itemExists = await UserModel.findOne({
          [param.length < 24 ? 'username' : '_id']: param,
          [`student_details.${detailKey}._id`]: updateData.id
        });
      
        if (!itemExists) {
          res.status(404).json({ error: `Object not found with ID: ${updateData.id}` });
          return;
        }
      }
                            
      let updateObject = {};
      switch (updateData.action) {
        case `add`: {
          updateObject = { $push: { [`student_details.${detailKey}`]: updateData.value } };
          break ;
        }
        case `remove`: {
          if (!updateData.id) {
            res.status(400).json({ error: `ID is required for remove operations` });
            return ;
          }
          updateObject = { $pull: { [`student_details.${detailKey}`]: { _id: updateData.id } } };
          break ;
        }
        case `update`: {
          if (!updateData.id) {
            res.status(400).json({ error: `ID is required for update operations` });
            return ;
          }
          updateObject = { $set: { [`student_details.${detailKey}.$[elem]`]: updateData.value } };
          break ;
        }
        default:
          res.status(400).json({ error: `Invalid action specified` });
          return ;
      }

      const result = await UserModel.updateOne(
        param.length < 24 ? { username: param } : { _id: param },
        updateObject,
        { 
          arrayFilters: [{'elem._id': updateData.id}],
        }
      );

      if (result.modifiedCount > 0) {
        return this.responseUpdatedroutes(req, res, param, 'sd');
      } 
      else {
        res.status(404).json({ error: `No changes made or user not found` });
      }
    } 
    catch (error) {
      console.error(`Error updating ${detailKey} details:`, error);
      res.status(500).json({ error: `Internal server error` });
    }
  }

  async getLastStudents(req: Request, res: Response, number: number) {
    try {
      const students = await UserModel.find({ role: `student` })
                                      .sort({ registered_date: 1 })
                                      .limit(number)
                                      .select('username profile_pic');
      res.status(200).json(students);
    }
    catch (error) {
      console.error(`Error retrieving ${number} lasts registered students`, error);
      res.status(500).json({ error: `Error retrieving students` });
    }
  }
}

export default new UserController;