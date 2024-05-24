import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { CompanyModel } from '../models/company.model';
import { COfferModel } from '../models/companyOffers.model';
import { isValidObjectId } from 'mongoose';

class CompanyOfferController {
  // POST
  public async createOffer(req: Request, res: Response): Promise<void> {
    try {
      let user;
      
      if (isValidObjectId(req.body.poster_id)) {
        user = await UserModel.findById(req.body.poster_id);
      }
      else {
        res.status(400).json({ message: `Invalid user id` });
        return ;
      }

      if (!user) {
        res.status(404).json({ message: `User not found` });
        return ;
      }
      if (user.role === `student`) {
        res.status(403).json({ message: `You are not allowed to do this, u are not an employee` });
        return ;
      }

      const companyName = user.worker_details?.company;
      if (!companyName) {
        res.status(403).json({ message: `You are not allowed to post an add since u didnt join a company` });
        return ;
      }

      const company = await CompanyModel.findOne({ name: companyName });
      if (!company) {
        res.status(404).json({ message: `Company not found` });
        return;
      }

      const newOffer = new COfferModel(req.body);

      if (!req.body.body) {
        newOffer.body = {};
      }

      newOffer.location = req.body.location ? req.body.location : company.contact_info?.city;
      
      const offer = await newOffer.save();

      company.offers?.push(offer._id);
      await company.save();

      res.status(201).json({ message: `Offer created successfully`, offer });
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
  public async getOffers(req: Request, res: Response): Promise<void> {
    try {
      const options = req.query; 
      const offers = await COfferModel.find(options);
      res.status(200).json(offers);
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

  public async getOfferById(req: Request, res: Response): Promise<void> {
    try {
      const offer = await COfferModel.findById(req.params.id);
      if (!offer) {
        res.status(404).json({ message: `Offer not found` });
      } 
      else {
        res.status(200).json(offer);
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

  public async getOfferWithCompanyInfo(req: Request, res: Response): Promise<void> {
    try {
      const offer = await COfferModel.findById(req.params.id);
      if (!offer) {
        res.status(404).json({ message: `Offer not found` });
        return;
      }

      const company = await CompanyModel.findOne({ name: offer.company_name });
      if (!company) {
        res.status(404).json({ message: `Company not found` });
        return;
      }

      res.status(200).json({ offer, company });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: `An unknown error occurred` });
      }
    }
  }

  // PUT
  public async updateOffer(req: Request, res: Response): Promise<void> {
    try {
      const updateData = { $set: req.body };
      const offer = await COfferModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

      if (!offer) {
        res.status(404).json({ message: `Offer not found` });
      }
      else {
        res.status(200).json(offer);
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

  public async updateOfferBody(req: Request, res: Response): Promise<void> {
    try {
      const bodyUpdates = req.body;

      const validFields = ['description', 'requirements', 'nice_to_have', 'benefits'];

      const updateData: { [key: string]: any } = {};
      for (const key in bodyUpdates) {
        if (Object.prototype.hasOwnProperty.call(bodyUpdates, key)) {
          if (validFields.includes(key)) {
            updateData[`body.${key}`] = bodyUpdates[key];
          } 
          else {
            res.status(400).json({ error: `Invalid field: ${key}` });
            return;
          }
        }
      }

      if (!isValidObjectId(req.params.id)) {
        res.status(400).json({ error: `Invalid offer ID` });
        return;
      }

      const updateResult = await COfferModel.updateOne(
        { _id: req.params.id },
        { $set: updateData }
      );

      if (updateResult.modifiedCount === 0) {
        res.status(400).json({ message: `No changes made to the offer` });
      } 
      else {
        const updatedOffer = await COfferModel.findById(req.params.id);
        res.status(200).json(updatedOffer);
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

  // DELETE
  public async deleteOffer(req: Request, res: Response): Promise<void> {
    try {
      const offer = await COfferModel.findByIdAndDelete(req.params.id);
      if (!offer) {
        res.status(404).json({ message: `Offer not found` });
      }
      else {
        res.status(200).json({ message: `Offer deleted successfully` });
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

export default new CompanyOfferController;