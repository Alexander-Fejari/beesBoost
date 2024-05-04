"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    profile_pic: { type: String, required: true, default: `https://cdn-s-www.lalsace.fr/images/5BF1570E-5E1C-4938-B1DB-B10CD87B8609/NW_raw/baysangur-chamsoudinov-photo-pfl-1709849968.jpg` }, // Photo par défaut à changer
    role: { type: String, required: true },
    email: { type: String, required: true },
    is_verified: { type: Boolean, required: true, default: true }, // A changer mais pour les tests ce sera nettement plus simple au début
    is_active: { type: Boolean, required: true, default: true },
    is_connected: { type: Boolean, required: true, default: false },
    name: { type: String },
    firstname: { type: String },
    school: { type: String },
    occupation: { type: String },
    location: { type: String },
    contact_info: { type: mongoose_1.Schema.Types.Mixed },
    formation: [{ type: mongoose_1.Schema.Types.Mixed }],
    experience: [{ type: mongoose_1.Schema.Types.Mixed }],
    skills: [{ type: mongoose_1.Schema.Types.Mixed }],
    certification: [{ type: mongoose_1.Schema.Types.Mixed }],
    languages: [{ type: mongoose_1.Schema.Types.Mixed }],
});
const StudentModel = (0, mongoose_1.model)('Student', studentSchema);
exports.StudentModel = StudentModel;
