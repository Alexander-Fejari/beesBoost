"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_model_1 = require("../models/worker.model");
const user_controller_1 = __importDefault(require("./user.controller"));
class WorkerController extends user_controller_1.default {
    async updateIsAdmin(req, res) {
        this.updateField(req, res, worker_model_1.WorkerModel, `is_admin`);
    }
}
exports.default = WorkerController;
