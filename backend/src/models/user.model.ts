import mongoose from 'mongoose';
import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
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
  profile_pic: { type: String, default: `https://cdn-s-www.lalsace.fr/images/5BF1570E-5E1C-4938-B1DB-B10CD87B8609/NW_raw/baysangur-chamsoudinov-photo-pfl-1709849968.jpg` }, // Photo par défaut à changer
  role: { type: String, required: true },
  email: { type: String, required: true },
  is_verified: { type: Boolean, required: true, default: true }, // A changer mais pour les tests ce sera nettement plus simple au début
  is_active: { type: Boolean, required: true, default: true }
});

const UserModel = model<IUser>('User', userSchema);

export { UserModel, IUser };
