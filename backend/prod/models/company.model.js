"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const mongoose_1 = require("mongoose");
const CompanyBooleanSchema = new mongoose_1.Schema({
    is_verified: { type: Boolean, required: true, default: true }, // Mettre default: false quand backOffice sera fait
    is_active: { type: Boolean, required: true, default: true }
});
const CompanyContactInfoSchema = new mongoose_1.Schema({
    email: { type: String },
    phone: { type: String },
    street: { type: String },
    street_number: { type: Number },
    box: { type: String },
    city: { type: String },
    postal_code: { type: Number },
    country: { type: String }
});
const companySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    verif_boolean: { type: CompanyBooleanSchema, required: true },
    profile_pic: { type: String },
    contact_info: CompanyContactInfoSchema,
    fields: { type: [String] },
    creation_date: { type: Date },
    creator_username: { type: String },
    admins: { type: [String] },
    worker: { type: [String] },
    registration_date: { type: Date },
    deletion_date: { type: Date },
    offers: { type: [String] },
    n_finished_contracts: { type: Number }
});
const CompanyModel = (0, mongoose_1.model)('Company', companySchema);
exports.CompanyModel = CompanyModel;
