"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mailer_service_1 = __importDefault(require("../services/mailer.service"));
const router = express_1.default.Router();
router.get(`/test`, (req, res) => mailer_service_1.default.sendConfirmationEmail(`clementlequenne1@gmail.com`, `Clément`, `1425`));
exports.default = router;
