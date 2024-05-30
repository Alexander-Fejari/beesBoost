import { Request, Response } from 'express';
import { CompanyModel } from '../models/company.model';
import { isValidObjectId } from 'mongoose';
//import { isValidObjectId } from '../utils/verification.util';

class CompanyController {
  // UTILS
  async getCompanyObject(req: Request, res: Response, name_or_id: string) {
    try {
      const user = (name_or_id.length < 24 ? await CompanyModel.findOne({ name: name_or_id }) : await CompanyModel.findOne({ _id: name_or_id}));
      return user;
    }
    catch (error) {
      console.error(`Error retrieving company:`, error);
      res.status(500).json({ error: `Error retrieving company` });
    }
  }

  // POST
  public async createCompany(req: Request, res: Response): Promise<void> {
    try {
      const { name, creator_username } = req.body;
      if (!name || !creator_username) {
        res.status(400).json({ error: `Name and creator_username are required` });
        return;
      }

      let newCompany = await CompanyModel.findOne({ name: name });
      
      if (newCompany) {
        res.status(400).json({ error: `Company with this name already exists` });
        return ;
      }
      newCompany = new CompanyModel(req.body);
      const company = await newCompany.save();
      res.status(201).json(company); 
    } 
    catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } 
      else {
        res.status(400).json({ error: `An unknown error occurred` });
      }
    }
  }

  // GET
  public async getCompanies(req: Request, res: Response): Promise<void> {
    try {
      const options = req.query;
      const companies = await CompanyModel.find(options);
      res.status(200).json(companies);
    } 
    catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } 
      else {
        res.status(400).json({ error: `An unknown error occurred` });
      }
    }
  }

  public async getCompany(req: Request, res: Response): Promise<void> {
    try {
      const company = await this.getCompanyObject(req, res, req.params.param);
      if (!company) {
        res.status(404).json({ message: `Company not found` });
      }
      else {
        res.status(200).json(company);
      }
    } 
    catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } 
      else {
        res.status(400).json({ error: `An unknown error occurred` });
      }
    }
  }

  public async getCompanyBasicInfo(req: Request, res: Response): Promise<void> {
    try {
      const param = req.params.param;
      let company;

      if (isValidObjectId(param)) {
        company = await CompanyModel.findById(param, '_id name profile_pic');
      } else if (param.length < 24) {
        company = await CompanyModel.findOne({ name: param }, '_id name profile_pic');
      } else {
        res.status(400).json({ error: 'Invalid parameter length' });
        return;
      }

      if (!company) {
        res.status(404).json({ message: 'Company not found' });
      } else {
        res.status(200).json(company);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  // PUT
  public async updateCompany(req: Request, res: Response): Promise<void> {
    try {
      const param = req.params.param;
      let company;
      
      if (param.length === 24) {
        company = await CompanyModel.findByIdAndUpdate(param, req.body, { new: true });
      } 
      else if (param.length < 24) {
        company = await CompanyModel.findOneAndUpdate({ name: param }, req.body, { new: true });
      } 
      else {
        res.status(400).json({ error: `Invalid parameter length` });
        return;
      }

      if (!company) {
        res.status(404).json({ message: `Company not found` });
      } 
      else {
        res.status(200).json(company);
      }
    } 
    catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } 
      else {
        res.status(400).json({ error: `An unknown error occurred` });
      }
    }
  }

  public async updateProfilePic(req: Request, res: Response): Promise<void> {
    try {
      const param = req.params.param;
      const file = req.file;
      const { link } = req.body;

      const company = await CompanyModel.findOne({ param });

      if (!company) {
        res.status(404).json({ error: `company not found` });
        return;
      }

      if (file) {
        company.profile_pic = file.path;
      } 
      else if (link) {
        company.profile_pic = link;
      } 
      else {
        res.status(400).json({ error: `No file or link provided` });
        return ;
      }

      await company.save();

      res.json({ message: `company's profile picture updated successfully`, profile_pic: company.profile_pic });
    } 
    catch (error) {
      console.error(`Error updating company's profile picture:`, error);
      res.status(500).json({ error: `Internal server error` });
    }
  }

  // DELETE
  public async deleteCompany(req: Request, res: Response): Promise<void> {
    try {
      const company = await CompanyModel.findByIdAndDelete(req.params.id);
      if (!company) {
        res.status(404).json({ message: `Company not found` });
      } 
      else {
        res.status(200).json({ message: `Company deleted successfully` });
      }
    } 
    catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } 
      else {
        res.status(400).json({ error: `An unknown error occurred` });
      }
    }
  }
}

export default new CompanyController;