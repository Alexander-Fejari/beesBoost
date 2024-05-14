"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const authController = new auth_controller_1.default();
router.post(`/signIn`, (req, res) => authController.userLogin(req, res));
router.post(`/renewToken`, (req, res) => authController.renewToken(req, res));
router.post(`/logOut/:param`, auth_middleware_1.authenticateToken, (req, res) => authController.logOut(req, res));
exports.default = router;
