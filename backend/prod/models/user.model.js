"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    profile_pic: { type: String },
    role: { type: String, required: true },
    email: { type: String, required: true },
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.UserModel = UserModel;
