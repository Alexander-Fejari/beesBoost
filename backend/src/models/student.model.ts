import { Schema, model } from 'mongoose';
import { IUser } from './user.model';

interface IStudent extends IUser {
    name: string;
    firstname: string;
    school: string;
    occupation: string;
    location: string;
    contact_info: Record<string, any>;
    formation: any[];
    experience: any[];
    skills: any[];
    certification: any[];
    languages: any[];
}

const studentSchema = new Schema<IStudent>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_pic: { type: String, required: true, default: `https://cdn-s-www.lalsace.fr/images/5BF1570E-5E1C-4938-B1DB-B10CD87B8609/NW_raw/baysangur-chamsoudinov-photo-pfl-1709849968.jpg` }, // Photo par défaut à changer
  role: { type: String, required: true },
  email: { type: String, required: true },
  is_verified: { type: Boolean, required: true, default: true }, // A changer mais pour les tests ce sera nettement plus simple au début
  is_active: { type: Boolean, required: true, default: true },
  is_connected: { type: Boolean, required: true, default: false },
  name: { type: String },
  firstname: { type: String },
  school: { type: String },
  occupation: { type: String },
  location: { type: String },
  contact_info: { type: Schema.Types.Mixed },
  formation: [{ type: Schema.Types.Mixed }],
  experience: [{ type: Schema.Types.Mixed }],
  skills: [{ type: Schema.Types.Mixed }],
  certification: [{ type: Schema.Types.Mixed }],
  languages: [{ type: Schema.Types.Mixed }],
  });

const StudentModel = model<IStudent>('Student', studentSchema);

export { StudentModel, IStudent };