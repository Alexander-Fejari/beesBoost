import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  profile_pic: string;
  role: string;
  email: string;
  is_verified: boolean;
  is_active: boolean;
  is_connected: boolean;
  lastname?: string;
  firstname?: string;
  occupation?: string;
  location?: string;
  contact_info?: {
      phone?: string;
      address?: string;
  };
  workerDetails?: {
      company?: string;
      is_company_admin?: boolean;
  };
  studentDetails?: {
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
  };
}


const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_pic: { type: String, required: true, default: `https://scontent.fcrl1-1.fna.fbcdn.net/v/t1.6435-9/107209573_3210813778982759_4891830877933540151_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GNNwt0wMw28Q7kNvgFRvakj&_nc_ht=scontent.fcrl1-1.fna&oh=00_AfDE5teHqwAc3S1qdVcqKQ6Z2Dk1ftFbHNqSTkGaPpACBg&oe=665E101A` },
  role: { type: String, required: true },
  email: { type: String, required: true },
  is_verified: { type: Boolean, required: true, default: true },
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
  workerDetails: {
      company: { type: String },
      is_company_admin: { type: Boolean, default: false }
  },
  studentDetails: {
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
      }]
  }
});


const UserModel = model<IUser>('User', userSchema);

export { UserModel, IUser };
