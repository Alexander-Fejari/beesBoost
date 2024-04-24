"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const db_1 = require("../config/db");
const UserModel = {
    async addUser(userData) {
        const collection = db_1.db.collection('users');
        const result = await collection.insertOne(userData);
        return result.insertedId.toHexString();
    },
    async getUsers() {
        const collection = db_1.db.collection('users');
        const users = await collection.find({}).toArray();
        return users;
    },
};
exports.UserModel = UserModel;
