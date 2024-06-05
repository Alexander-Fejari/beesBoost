"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const router = (0, express_1.Router)();
router.get('/:userId', (req, res) => message_controller_1.default.getMessages(req, res));
router.get('/message/:messageId', (req, res) => message_controller_1.default.getMessageById(req, res));
router.post('/', (req, res) => message_controller_1.default.sendMessage(req, res));
router.delete('/:messageId', (req, res) => message_controller_1.default.deleteMessage(req, res));
exports.default = router;
