"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
const message_model_1 = require("../models/message.model");
const socketHandler = (socket, io) => {
    console.log('New client connected');
    socket.on('sendMessage', async (messageData) => {
        const { sender, receiver, content } = messageData;
        const newMessage = new message_model_1.MessageModel({ sender, receiver, content });
        await newMessage.save();
        io.to(sender).emit('receiveMessage', newMessage);
        io.to(receiver).emit('receiveMessage', newMessage);
    });
    socket.on('join', (userId) => {
        socket.join(userId);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
};
exports.socketHandler = socketHandler;
