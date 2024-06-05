import { Socket, Server as SocketIOServer } from 'socket.io';
import { MessageModel } from '../models/message.model';

export const socketHandler = (socket: Socket, io: SocketIOServer) => {
  console.log('New client connected');

  socket.on('sendMessage', async (messageData) => {
    const { sender, receiver, content } = messageData;
    const newMessage = new MessageModel({ sender, receiver, content });
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