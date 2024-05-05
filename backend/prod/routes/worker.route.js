"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const worker_controller_1 = __importDefault(require("../controllers/worker.controller"));
const worker_model_1 = require("../models/worker.model");
const router = express_1.default.Router();
const workerController = new worker_controller_1.default();
// POST
router.post('/addWorker', (req, res) => workerController.addUser(req, res, worker_model_1.WorkerModel, `worker`)); // Swagger à faire
// GET
router.get('/getWorker/:param', (req, res) => workerController.getUser(req, res, worker_model_1.WorkerModel)); // Swagger à faire
router.get('/getAllWorkers', (req, res) => workerController.getAllUsers(req, res, worker_model_1.WorkerModel)); // Swagger à faire
// DELETE
router.delete('/deleteWorker', (req, res) => workerController.deleteUser(req, res, worker_model_1.WorkerModel)); // Swagger à faire
// PUT
router.put(`/updateWorkerInfo/:param`, (req, res) => workerController.updateFields(req, res, worker_model_1.WorkerModel, [`password`, `profile_pic`, `email`, `name`, `firstname`, `occupation`, `location`, `contact_info`, `entreprise`])); // Swagger à faire
router.put(`/updateWorkerVerified/:param`, (req, res) => workerController.updateField(req, res, worker_model_1.WorkerModel, `is_verified`)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin
router.put(`/updateWorkerActive/:param`, (req, res) => workerController.updateField(req, res, worker_model_1.WorkerModel, `is_active`)); // Swagger à faire
router.put(`/updateWorkerConnected/:param`, (req, res) => workerController.updateField(req, res, worker_model_1.WorkerModel, `is_connected`)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin
router.put(`/updateWorkerUsername/:param`, (req, res) => workerController.updateField(req, res, worker_model_1.WorkerModel, `username`)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin + pas nécéssaire a priori sauf si l'admin doit pouvoir le changer dans la verif
router.put(`/updateWorkerAdmin/:param`, (req, res) => workerController.updateIsAdmin(req, res)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin + admin de l'entreprise
exports.default = router;
