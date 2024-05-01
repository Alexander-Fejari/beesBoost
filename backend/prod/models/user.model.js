"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    profile_pic: { type: String, default: `https://cdn-s-www.lalsace.fr/images/5BF1570E-5E1C-4938-B1DB-B10CD87B8609/NW_raw/baysangur-chamsoudinov-photo-pfl-1709849968.jpg` }, // Photo par défaut à changer
    role: { type: String, required: true },
    email: { type: String, required: true },
    is_verified: { type: Boolean, required: true, default: true }, // A changer mais pour les tests ce sera nettement plus simple au début
    is_active: { type: Boolean, required: true, default: true }
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.UserModel = UserModel;
