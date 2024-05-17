"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_DETAILS = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const IS_DETAILS = {
    school: {
        name: true
    },
    formation: {
        degree: true,
        field: true,
        school: true,
        graduation_year: true
    },
    experience: {
        title: true,
        company: true,
        location: true,
        start_date: true,
        end_date: true,
        description: true
    },
    skills: {
        name: true,
        level: true
    },
    certification: {
        name: true,
        provider: true,
        date: true
    },
    languages: {
        name: true,
        level: true
    },
    game_info: {
        level: true,
        nb_jobs_done: true,
        nb_jobs_atm: true,
        title: true
    }
};
exports.IS_DETAILS = IS_DETAILS;
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reset_token_pass: { type: String },
    profile_pic: { type: String, required: true, default: `https://scontent.fcrl1-1.fna.fbcdn.net/v/t1.6435-9/107209573_3210813778982759_4891830877933540151_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GNNwt0wMw28Q7kNvgFRvakj&_nc_ht=scontent.fcrl1-1.fna&oh=00_AfDE5teHqwAc3S1qdVcqKQ6Z2Dk1ftFbHNqSTkGaPpACBg&oe=665E101A` },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    email_confirmed: { type: Boolean, required: true, default: false },
    confirmation_token: { type: String },
    is_verified: { type: Boolean, required: true, default: true }, // A mettre en false pour la production
    is_active: { type: Boolean, required: true, default: true },
    is_connected: { type: Boolean, required: true, default: false },
    prefered_language: { type: String, required: true, default: `fr` },
    refresh_token: { type: String },
    lastname: { type: String },
    firstname: { type: String },
    occupation: { type: String },
    location: { type: String },
    registration_date: { type: Date, default: Date.now },
    deletion_date: { type: Date },
    contact_info: {
        phone: { type: String },
        street: { type: String },
        street_number: { type: String },
        box: { type: String },
        city: { type: String },
        country: { type: String },
        postal_code: { type: Number },
    },
    worker_details: {
        company: { type: String },
        is_company_admin: { type: Boolean }
    },
    student_details: {
        school: { type: String },
        formation: [{
                degree: { type: String },
                field: { type: String },
                school: { type: String },
                graduation_year: { type: Number }
            }],
        experience: [{
                title: { type: String },
                company: { type: String },
                location: { type: String },
                start_date: { type: Date },
                end_date: { type: Date },
                description: { type: String }
            }],
        skills: [{
                name: { type: String },
                level: { type: String }
            }],
        certification: [{
                name: { type: String },
                provider: { type: String },
                date: { type: Date }
            }],
        languages: [{
                name: { type: String },
                level: { type: String }
            }],
        game_info: [{
                level: { type: Number },
                nb_jobs_done: { type: Number },
                nb_jobs_atm: { type: Number },
                title: { type: String },
            }],
    }
});
UserSchema.index({ registered_date: -1 });
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt_1.default.compare(candidatePassword, this.password);
};
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.UserModel = UserModel;
