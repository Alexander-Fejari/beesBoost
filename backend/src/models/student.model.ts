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
    profile_pic: { type: String },
    role: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    firstname: { type: String, required: true },
    school: { type: String, required: true },
    occupation: { type: String, required: true },
    location: { type: String, required: true },
    contact_info: { type: Schema.Types.Mixed },
    formation: [{ type: Schema.Types.Mixed }],
    experience: [{ type: Schema.Types.Mixed }],
    skills: [{ type: Schema.Types.Mixed }],
    certification: [{ type: Schema.Types.Mixed }],
    languages: [{ type: Schema.Types.Mixed }],
  });

const StudentModel = model<IStudent>('Student', studentSchema);

export { StudentModel, IStudent };