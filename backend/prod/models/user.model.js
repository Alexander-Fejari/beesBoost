"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    profile_pic: { type: String, required: true, default: `https://scontent.fcrl1-1.fna.fbcdn.net/v/t1.6435-9/107209573_3210813778982759_4891830877933540151_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GNNwt0wMw28Q7kNvgFRvakj&_nc_ht=scontent.fcrl1-1.fna&oh=00_AfDE5teHqwAc3S1qdVcqKQ6Z2Dk1ftFbHNqSTkGaPpACBg&oe=665E101A` },
    role: { type: String, required: true },
    email: { type: String, required: true },
    is_verified: { type: Boolean, required: true, default: true }, // A mettre en false, mais plus simple pour les tests
    is_active: { type: Boolean, required: true, default: true },
    is_connected: { type: Boolean, required: true, default: false },
    lastname: { type: String },
    firstname: { type: String },
    occupation: { type: String },
    location: { type: String },
    contact_info: {
        phone: { type: String },
        address: { type: String }
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
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.UserModel = UserModel;
