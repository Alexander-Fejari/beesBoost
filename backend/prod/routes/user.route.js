"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = express_1.default.Router();
const userController = new user_controller_1.default();
router.get('/getAllUsers', (req, res) => userController.getAllUsers(req, res));
router.get('/getUser/:username', (req, res) => userController.getUser(req, res));
router.post('/addUser', (req, res) => userController.addUser(req, res));
exports.default = router;
