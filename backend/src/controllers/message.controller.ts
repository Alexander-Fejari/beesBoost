import { Request, Response } from 'express';
import { MessageModel } from '../models/message.model';

class MessageController {
  public async getMessages(req: Request, res: Response): Promise<void> {
    try {
      const { user_id } = req.params;
      const messages = await MessageModel.find({
        $or: [{ sender: user_id }, { receiver: user_id }]
      });
      res.status(200).json(messages);
    } 
    catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getMessageById(req: Request, res: Response): Promise<void> {
    try {
      const { messageId } = req.params;
      const message = await MessageModel.findById(messageId);
      if (!message) {
        res.status(404).json({ error: `Message not found` });
      } else {
        res.status(200).json(message);
      }
    } 
    catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const { sender, receiver, content } = req.body;
      const newMessage = new MessageModel({ sender, receiver, content });
      await newMessage.save();
      res.status(201).json(newMessage);
    } 
    catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async deleteMessage(req: Request, res: Response): Promise<void> {
    try {
      const { messageId } = req.params;
      const deletedMessage = await MessageModel.findByIdAndDelete(messageId);
      if (!deletedMessage) {
        res.status(404).json({ error: `Message not found` });
      } else {
        res.status(200).json({ message: `Message deleted successfully` });
      }
    } 
    catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
  
export default new MessageController();