"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COffersModel = void 0;
const mongoose_1 = require("mongoose");
const cOffersSchema = new mongoose_1.Schema({});
const COffersModel = (0, mongoose_1.model)('CompanyOffers', cOffersSchema);
exports.COffersModel = COffersModel;
