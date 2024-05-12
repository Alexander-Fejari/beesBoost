import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IContactInfo {
    phone?: string;
    street?: string;
    street_number?: number;
    box?: string;
    city?: string;
    postal_code?: number;
    country?: string;
}

interface IWDetails {
  company?: string;
  is_company_admin?: boolean;
}

interface IFormation {
  degree?: string;
  field?: string;
  school?: string;
  graduation_year?: number;
}

interface IExperience {
  title?: string;
  company?: string;
  location?: string;
  start_date?: Date;
  end_date?: Date;
  description?: string;
}

interface ISkills {
  name?: string;
  level?: string;
}

interface ICertification {
  name?: string;
  provider?: string;
  date?: Date;
}

interface ILanguages {
  name?: string;
  level?: string;
}

interface IGameInfo {
  level?: number;
  nb_jobs_done?: number;
  nb_jobs_atm?: number;
  title?: string;
}

interface ISDetails {
  school?: string;
  formation?: Array<IFormation>;
  experience?: Array<IExperience>;
  skills?: Array<ISkills>;
  certification?: Array<ICertification>;
  languages?: Array<ILanguages>;
  game_info?: Array<IGameInfo>;
}

interface IUser extends Document {
  username: string;
  password: string;
  profile_pic: string;
  role: string;
  email: string;
  is_verified: boolean;
  is_active: boolean;
  is_connected: boolean;
  refresh_token?: string;
  lastname?: string;
  firstname?: string;
  occupation?: string;
  location?: string;
  registration_date?: Date;
  deletion_date?: Date;
  contact_info?: IContactInfo;
  worker_details?: IWDetails;
  student_details?: ISDetails;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  [key: string]: any;
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_pic: { type: String, required: true, default: `https://scontent.fcrl1-1.fna.fbcdn.net/v/t1.6435-9/107209573_3210813778982759_4891830877933540151_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GNNwt0wMw28Q7kNvgFRvakj&_nc_ht=scontent.fcrl1-1.fna&oh=00_AfDE5teHqwAc3S1qdVcqKQ6Z2Dk1ftFbHNqSTkGaPpACBg&oe=665E101A` },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  is_verified: { type: Boolean, required: true, default: false }, // A mettre en false pour la production
  is_active: { type: Boolean, required: true, default: true },
  is_connected: { type: Boolean, required: true, default: false },
  refresh_token: { type: String, default: `` },
  lastname: { type: String },
  firstname: { type: String },
  occupation: { type: String },
  location: { type: String },
  registration_date: { type: Date, default: Date.now },
  deletion_date: { type: Date },
  contact_info: {
    phone: { type: String },
    street: { type: String },
    street_number: { type: String },
    box: { type : String },
    city: { type: String },
    country: { type: String },
    postal_code: { type: Number },
  },
  worker_details: {
    company: { type: String },
    is_company_admin: { type: Boolean }
  },
  student_details: {
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
    game_info: [{
      level: { type: Number },
      nb_jobs_done: { type: Number },
      nb_jobs_atm: { type: Number },
      title: { type: String },
    }],
  }
});

userSchema.index({ registered_date: -1 });

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = model<IUser>('User', userSchema);

export { UserModel, IUser, ISDetails, IWDetails, IContactInfo };