import { Schema, model } from 'mongoose';
import { IUser } from './user.model';

interface IWorker extends IUser {
  company?: string;
  is_company_admin?: boolean;
}

const workerSchema = new Schema<IWorker>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_pic: { type: String, required: true, default: `https://scontent.fcrl1-1.fna.fbcdn.net/v/t1.6435-9/107209573_3210813778982759_4891830877933540151_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GNNwt0wMw28Q7kNvgFRvakj&_nc_ht=scontent.fcrl1-1.fna&oh=00_AfDE5teHqwAc3S1qdVcqKQ6Z2Dk1ftFbHNqSTkGaPpACBg&oe=665E101A` },
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
  company: { type: String }, // Dés que j'ai fait entreprise : Verifie si l'entreprise existe, si non la créer, et mettre ce worker en admin
  is_company_admin: { type: Boolean, required: true, default: false },
});

const WorkerModel = model<IWorker>('Worker', workerSchema);

export { WorkerModel, IWorker };