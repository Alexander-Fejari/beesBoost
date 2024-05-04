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
  profile_pic: { type: String, required: true, default: `https://scontent.fcrl1-1.fna.fbcdn.net/v/t1.6435-9/107209573_3210813778982759_4891830877933540151_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GNNwt0wMw28Q7kNvgFRvakj&_nc_ht=scontent.fcrl1-1.fna&oh=00_AfDE5teHqwAc3S1qdVcqKQ6Z2Dk1ftFbHNqSTkGaPpACBg&oe=665E101A` }, // Photo par défaut à changer
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