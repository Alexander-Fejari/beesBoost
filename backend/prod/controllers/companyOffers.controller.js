"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const company_model_1 = require("../models/company.model");
const companyOffers_model_1 = require("../models/companyOffers.model");
class CompanyOfferController {
    // POST
    async createOffer(req, res) {
        try {
            const user = await user_model_1.UserModel.findOne(req.body.poster_id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            if (user.role === `student`) {
                res.status(403).json({ message: 'You are not allowed to do this, u are not an employee' });
                return;
            }
            const companyName = user.worker_details?.company;
            if (!companyName) {
                res.status(403).json({ message: 'You are not allowed to post an add since u didnt join a company' });
                return;
            }
            const company = await company_model_1.CompanyModel.findOne({ name: companyName });
            if (!company) {
                res.status(404).json({ message: 'Company not found' });
                return;
            }
            const newOffer = new companyOffers_model_1.COfferModel(req.body);
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
    async getOffers(req, res) {
        try {
            const options = req.query;
            const offers = await companyOffers_model_1.COfferModel.find(options);
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
    async getOfferById(req, res) {
        try {
            const offer = await companyOffers_model_1.COfferModel.findById(req.params.id);
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
    async getOfferWithCompanyInfo(req, res) {
        try {
            const offer = await companyOffers_model_1.COfferModel.findById(req.params.id);
            if (!offer) {
                res.status(404).json({ message: 'Offer not found' });
                return;
            }
            const company = await company_model_1.CompanyModel.findOne({ name: offer.company_name });
            if (!company) {
                res.status(404).json({ message: 'Company not found' });
                return;
            }
            res.status(200).json({ offer, company });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }
    // PUT
    async updateOffer(req, res) {
        try {
            const offer = await companyOffers_model_1.COfferModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    async deleteOffer(req, res) {
        try {
            const offer = await companyOffers_model_1.COfferModel.findByIdAndDelete(req.params.id);
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
exports.default = new CompanyOfferController;
