"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const company_model_1 = require("../models/company.model");
const mongoose_1 = require("mongoose");
//import { isValidObjectId } from '../utils/verification.util';
class CompanyController {
    // UTILS
    async getCompanyObject(req, res, name_or_id) {
        try {
            const user = (name_or_id.length < 24 ? await company_model_1.CompanyModel.findOne({ name: name_or_id }) : await company_model_1.CompanyModel.findOne({ _id: name_or_id }));
            return user;
        }
        catch (error) {
            console.error(`Error retrieving company:`, error);
            res.status(500).json({ error: `Error retrieving company` });
        }
    }
    // POST
    async createCompany(req, res) {
        try {
            const { name, creator_username } = req.body;
            if (!name || !creator_username) {
                res.status(400).json({ error: `Name and creator_username are required` });
                return;
            }
            let newCompany = await company_model_1.CompanyModel.findOne({ name: name });
            if (newCompany) {
                res.status(400).json({ error: `Company with this name already exists` });
                return;
            }
            newCompany = new company_model_1.CompanyModel(req.body);
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
    async getCompanies(req, res) {
        try {
            const options = req.query;
            const companies = await company_model_1.CompanyModel.find(options);
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
    async getCompany(req, res) {
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
    async getCompanyBasicInfo(req, res) {
        try {
            const param = req.params.param;
            let company;
            if ((0, mongoose_1.isValidObjectId)(param)) {
                company = await company_model_1.CompanyModel.findById(param, '_id name profile_pic');
            }
            else if (param.length < 24) {
                company = await company_model_1.CompanyModel.findOne({ name: param }, '_id name profile_pic');
            }
            else {
                res.status(400).json({ error: 'Invalid parameter length' });
                return;
            }
            if (!company) {
                res.status(404).json({ message: 'Company not found' });
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
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }
    // PUT
    async updateCompany(req, res) {
        try {
            const param = req.params.param;
            let company;
            if (param.length === 24) {
                company = await company_model_1.CompanyModel.findByIdAndUpdate(param, req.body, { new: true });
            }
            else if (param.length < 24) {
                company = await company_model_1.CompanyModel.findOneAndUpdate({ name: param }, req.body, { new: true });
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
    async updateProfilePic(req, res) {
        try {
            const param = req.params.param;
            const file = req.file;
            const { link } = req.body;
            const company = await company_model_1.CompanyModel.findOne({ param });
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
                return;
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
    async deleteCompany(req, res) {
        try {
            const company = await company_model_1.CompanyModel.findByIdAndDelete(req.params.id);
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
exports.default = new CompanyController;
