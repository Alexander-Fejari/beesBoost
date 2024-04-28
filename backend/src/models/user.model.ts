import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  profile_pic: string;
  role: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  profile_pic: { type: String},
  role: { type: String, required: true },
  email: { type: String, required: true },
});

const UserModel = model<IUser>('User', userSchema);

export { UserModel, IUser };
