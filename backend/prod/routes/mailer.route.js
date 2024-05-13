"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mailer_controller_1 = __importDefault(require("../controllers/mailer.controller"));
const router = express_1.default.Router();
const mailerController = new mailer_controller_1.default();
router.get(`/test`, (req, res) => mailerController.sendConfirmationEmail(`clementlequenne1@gmail.com`, `Clément`, `1425`));
exports.default = router;
