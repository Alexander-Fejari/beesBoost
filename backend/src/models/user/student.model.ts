import { Schema, model } from 'mongoose';
import { IUser } from './user.model';

interface IStudent extends IUser {
  school?: string;
  formation?: {
      degree?: string;
      field?: string;
      school?: string;
      graduation_year?: number;
  }[];
  experience?: {
      title?: string;
      company?: string;
      location?: string;
      start_date?: Date;
      end_date?: Date;
      description?: string;
  }[];
  skills?: {
      name?: string;
      level?: string;
  }[];
  certification?: {
      name?: string;
      provider?: string;
      date?: Date;
  }[];
  languages?: {
      name?: string;
      level?: string;
  }[];
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
  lastname: { type: String },
  firstname: { type: String },
  occupation: { type: String },
  location: { type: String },
  contact_info: {
    phone: { type: String },
    address: { type: String }
  },
  school: { type: String },
  formation: [{
      degree: { type: String },
      field: { type: String },
      school: { type: String },
      graduation_year: { type: Number }
  }],
  experience: [{
      title: { type: String },
      company: { type: String },
      location: { type: String },
      start_date: { type: Date },
      end_date: { type: Date },
      description: { type: String }
  }],
  skills: [{
      name: { type: String },
      level: { type: String }
  }],
  certification: [{
      name: { type: String },
      provider: { type: String },
      date: { type: Date }
  }],
  languages: [{
      name: { type: String },
      level: { type: String }
  }],
});

const StudentModel = model<IStudent>('Student', studentSchema);

export { StudentModel, IStudent };