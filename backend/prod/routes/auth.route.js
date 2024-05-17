"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post(`/signIn`, (req, res) => auth_controller_1.default.userLogin(req, res));
router.post(`/renewToken`, (req, res) => auth_controller_1.default.renewToken(req, res));
router.post(`/logOut/:param`, auth_middleware_1.authenticateToken, (req, res) => auth_controller_1.default.logOut(req, res));
router.post('/requestPasswordReset', auth_controller_1.default.requestPasswordReset); // Swagger à faire
router.post('/resetPassword/:token', auth_controller_1.default.resetPassword); // Swagger à faire
exports.default = router;
