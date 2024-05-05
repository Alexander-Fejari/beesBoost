import express, { Router } from 'express';
import WorkerController from '../../controllers/user/worker.controller';
import { WorkerModel } from '../../models/user/worker.model';

const router: Router = express.Router();
const workerController = new WorkerController();

// POST


router.post('/addWorker', (req, res) => workerController.addUser(req, res, WorkerModel, `worker`)); // Swagger à faire

// GET


router.get('/getAllWorkers', (req, res) => workerController.getAllUsers(req, res, WorkerModel)); // Swagger à faire

router.get('/getWorker/:param', (req, res) => workerController.getUser(req, res, WorkerModel)); // Swagger à faire

// DELETE


router.delete('/deleteWorker', (req, res) => workerController.deleteUser(req, res, WorkerModel)); // Swagger à fair

// PUT


router.put(`/updateWorkerInfo/:param`, (req, res) => workerController.updateFields(req, res, WorkerModel, [`password`, `profile_pic`, `email`, `name`, `firstname`, `occupation`, `location`, `contact_info`, `company`])); // Swagger à faire

router.put(`/updateWorkerVerified/:param`, (req, res) => workerController.updateField(req, res, WorkerModel, `is_verified`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin

router.put(`/updateWorkerActive/:param`, (req, res) => workerController.updateField(req, res, WorkerModel, `is_active`)); // Swagger à faire

router.put(`/updateWorkerConnected/:param`, (req, res) => workerController.updateField(req, res, WorkerModel, `is_connected`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin

router.put(`/updateWorkerUsername/:param`, (req, res) => workerController.updateField(req, res, WorkerModel, `username`));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin + pas nécéssaire a priori sauf si l'admin doit pouvoir le changer dans la verif

router.put(`/updateWorkerAdmin/:param`, (req, res) => workerController.updateIsAdmin(req, res));// Swagger à faire + Ajouter protection : Possible que si admin/superAdmin + admin de l'entreprise

export default router;
