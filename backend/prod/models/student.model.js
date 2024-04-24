"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const db_1 = require("../config/db");
const StudentModel = {
    async addStudentProfile(studentData) {
        const collection = db_1.db.collection('students');
        const result = await collection.insertOne(studentData);
        return result.insertedId.toHexString();
    },
    async getStudentProfiles() {
        const collection = db_1.db.collection('students');
        const profiles = await collection.find({}).toArray();
        return profiles;
    },
};
exports.StudentModel = StudentModel;
