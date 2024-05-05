"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../../controllers/user/user.controller"));
const user_model_1 = require("../../models/user/user.model");
const router = express_1.default.Router();
const userController = new user_controller_1.default();
// POST
router.post(`/addUser`, (req, res) => userController.addUser(req, res, user_model_1.UserModel, `user`)); // Swagger à faire
// GET
router.get(`/getAllUsers`, (req, res) => userController.getAllUsers(req, res, user_model_1.UserModel)); // Swagger à faire
router.get(`/getUser/:param`, (req, res) => userController.getUser(req, res, user_model_1.UserModel)); // Swagger à faire
// DELETE
router.delete(`/deleteUser`, (req, res) => userController.deleteUser(req, res, user_model_1.UserModel)); // Swagger à faire + Ajouter Protection : admin/superAdmin 
// PUT
router.put(`/updateUserInfo/:param`, (req, res) => userController.updateFields(req, res, user_model_1.UserModel, [`password`, `profile_pic`, `email`, `lastname`, `firstname`, `occupation`, `location`, `contact_info`])); // Swagger à faire
router.put(`/updateUserVerified/:param`, (req, res) => userController.updateField(req, res, user_model_1.UserModel, `is_verified`)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin
router.put(`/updateUserActive/:param`, (req, res) => userController.updateField(req, res, user_model_1.UserModel, `is_active`)); // Swagger à faire
router.put(`/updateUserConnected/:param`, (req, res) => userController.updateField(req, res, user_model_1.UserModel, `is_connected`)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin
router.put(`/updateUserUsername/:param`, (req, res) => userController.updateField(req, res, user_model_1.UserModel, `username`)); // Swagger à faire + Ajouter protection : Possible que si admin/superAdmin + pas nécéssaire a priori sauf si l'admin doit pouvoir le changer dans la verif
exports.default = router;
