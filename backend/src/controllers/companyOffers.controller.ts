import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { CompanyModel } from '../models/company.model';
import { COfferModel } from '../models/companyOffers.model';

class CompanyOfferController {
  // POST
  public async createOffer(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserModel.findOne(req.body.poster_id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return ;
      }
      if (user.role === `student`) {
        res.status(403).json({ message: 'You are not allowed to do this, u are not an employee' });
        return ;
      }

      const companyName = user.worker_details?.company;
      if (!companyName) {
        res.status(403).json({ message: 'You are not allowed to post an add since u didnt join a company' });
        return ;
      }

      const company = await CompanyModel.findOne({ name: companyName });
      if (!company) {
        res.status(404).json({ message: 'Company not found' });
        return;
      }

      const newOffer = new COfferModel(req.body);

      
      const offer = await newOffer.save();
      res.status(201).json(offer);
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
        res.status(404).json({ message: 'Offer not found' });
        return;
      }

      const company = await CompanyModel.findOne({ name: offer.company_name });
      if (!company) {
        res.status(404).json({ message: 'Company not found' });
        return;
      }

      res.status(200).json({ offer, company });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  // PUT
  public async updateOffer(req: Request, res: Response): Promise<void> {
    try {
      const offer = await COfferModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
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