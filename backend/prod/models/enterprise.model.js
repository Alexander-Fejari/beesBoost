"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseModel = void 0;
const db_1 = require("../config/db");
const EnterpriseModel = {
    async addEnterpriseProfile(enterpriseData) {
        const collection = db_1.db.collection('enterprises');
        const result = await collection.insertOne(enterpriseData);
        return result.insertedId.toHexString();
    },
    async getEnterpriseProfiles() {
        const collection = db_1.db.collection('enterprises');
        const profiles = await collection.find({}).toArray();
        return profiles;
    },
};
exports.EnterpriseModel = EnterpriseModel;
