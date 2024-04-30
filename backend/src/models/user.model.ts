import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  profile_pic: string;
  role: string;
  email: string;
  is_verified: boolean;
  is_active: boolean;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_pic: { type: String },
  role: { type: String, required: true },
  email: { type: String, required: true },
  is_verified: { type: Boolean, required: true, default: false },
  is_active: { type: Boolean, required: true, default: false }
});

const UserModel = model<IUser>('User', userSchema);

export { UserModel, IUser };
