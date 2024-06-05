import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export { MessageModel };