"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Request, Response } from 'express';
//import { StudentModel, IStudent } from '../models/student.model';
const user_controller_1 = __importDefault(require("./user.controller"));
class StudentController extends user_controller_1.default {
}
exports.default = StudentController;
