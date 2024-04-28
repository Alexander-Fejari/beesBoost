"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    profile_pic: { type: String },
    role: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    firstname: { type: String, required: true },
    school: { type: String, required: true },
    occupation: { type: String, required: true },
    location: { type: String, required: true },
    contact_info: { type: mongoose_1.Schema.Types.Mixed },
    formation: [{ type: mongoose_1.Schema.Types.Mixed }],
    experience: [{ type: mongoose_1.Schema.Types.Mixed }],
    skills: [{ type: mongoose_1.Schema.Types.Mixed }],
    certification: [{ type: mongoose_1.Schema.Types.Mixed }],
    languages: [{ type: mongoose_1.Schema.Types.Mixed }],
});
const StudentModel = (0, mongoose_1.model)('Student', studentSchema);
exports.StudentModel = StudentModel;
