"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COfferModel = void 0;
const mongoose_1 = require("mongoose");
const OfferAddressSchema = new mongoose_1.Schema({
    street: { type: String },
    street_number: { type: Number },
    box: { type: String },
    city: { type: String },
    postal_code: { type: Number },
    country: { type: String }
});
const MissionBodySchema = new mongoose_1.Schema({
    description: { type: String },
    requirements: { type: [String] },
    nice_to_have: { type: [String] },
    benefits: { type: [String] }
});
const COfferSchema = new mongoose_1.Schema({
    poster_id: { type: String },
    company_name: { type: String },
    field: { type: String },
    function: { type: String },
    creation_date: { type: Date, default: Date.now },
    start_date: { type: Date },
    duration: { type: Number },
    CV: { type: String },
    promoted: { type: Boolean },
    promotion_expiration: { type: Date },
    title: { type: String },
    body: MissionBodySchema,
    address: OfferAddressSchema,
    taker_id: { type: String },
    status: { type: String }
});
const COfferModel = (0, mongoose_1.model)('CompanyOffers', COfferSchema);
exports.COfferModel = COfferModel;
