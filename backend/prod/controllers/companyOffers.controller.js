"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const company_model_1 = require("../models/company.model");
const companyOffers_model_1 = require("../models/companyOffers.model");
const mongoose_1 = require("mongoose");
class CompanyOfferController {
    // POST
    async createOffer(req, res) {
        try {
            let user;
            if ((0, mongoose_1.isValidObjectId)(req.body.poster_id)) {
                user = await user_model_1.UserModel.findById(req.body.poster_id);
            }
            else {
                res.status(400).json({ message: `Invalid user id` });
                return;
            }
            if (!user) {
                res.status(404).json({ message: `User not found` });
                return;
            }
            if (user.role === `student`) {
                res.status(403).json({ message: `You are not allowed to do this, u are not an employee` });
                return;
            }
            const companyName = user.worker_details?.company;
            if (!companyName) {
                res.status(403).json({ message: `You are not allowed to post an add since u didnt join a company` });
                return;
            }
            const company = await company_model_1.CompanyModel.findOne({ name: companyName });
            if (!company) {
                res.status(404).json({ message: `Company not found` });
                return;
            }
            const newOffer = new companyOffers_model_1.COfferModel(req.body);
            if (!req.body.body) {
                newOffer.body = {};
            }
            newOffer.location = req.body.location ? req.body.location : company.contact_info?.city;
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
                res.status(404).json({ message: `Offer not found` });
                return;
            }
            const company = await company_model_1.CompanyModel.findOne({ name: offer.company_name });
            if (!company) {
                res.status(404).json({ message: `Company not found` });
                return;
            }
            res.status(200).json({ offer, company });
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
    // PUT
    async updateOffer(req, res) {
        try {
            const updateData = { $set: req.body };
            const offer = await companyOffers_model_1.COfferModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
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
    async updateOfferBody(req, res) {
        try {
            const bodyUpdates = req.body;
            const validFields = ['description', 'requirements', 'nice_to_have', 'benefits'];
            const updateData = {};
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
            if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
                res.status(400).json({ error: `Invalid offer ID` });
                return;
            }
            const updateResult = await companyOffers_model_1.COfferModel.updateOne({ _id: req.params.id }, { $set: updateData });
            if (updateResult.modifiedCount === 0) {
                res.status(400).json({ message: `No changes made to the offer` });
            }
            else {
                const updatedOffer = await companyOffers_model_1.COfferModel.findById(req.params.id);
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
