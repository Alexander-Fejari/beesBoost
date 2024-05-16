"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const mongoose_1 = require("mongoose");
const companySchema = new mongoose_1.Schema({});
const CompanyModel = (0, mongoose_1.model)('Companies', companySchema);
exports.CompanyModel = CompanyModel;
