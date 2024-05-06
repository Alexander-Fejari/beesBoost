"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.default.Router();
const userController = new user_controller_1.default();
const authController = new auth_controller_1.default();
router.post('/signup', (req, res) => userController.addUser(req, res));
router.post('/login', (req, res) => authController.login(req, res));
exports.default = router;
