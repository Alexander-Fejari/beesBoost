"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_model_1 = require("../models/message.model");
class MessageController {
    async getMessages(req, res) {
        try {
            const { userId } = req.params;
            const messages = await message_model_1.MessageModel.find({
                $or: [{ sender: userId }, { receiver: userId }]
            });
            res.status(200).json(messages);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getMessageById(req, res) {
        try {
            const { messageId } = req.params;
            const message = await message_model_1.MessageModel.findById(messageId);
            if (!message) {
                res.status(404).json({ error: `Message not found` });
            }
            else {
                res.status(200).json(message);
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async sendMessage(req, res) {
        try {
            const { sender, receiver, content } = req.body;
            const newMessage = new message_model_1.MessageModel({ sender, receiver, content });
            await newMessage.save();
            res.status(201).json(newMessage);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteMessage(req, res) {
        try {
            const { messageId } = req.params;
            const deletedMessage = await message_model_1.MessageModel.findByIdAndDelete(messageId);
            if (!deletedMessage) {
                res.status(404).json({ error: `Message not found` });
            }
            else {
                res.status(200).json({ message: `Message deleted successfully` });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new MessageController();
