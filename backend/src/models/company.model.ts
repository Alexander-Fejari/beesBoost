import { Schema, model, Document } from 'mongoose';
import { ICOffer } from './companyOffers.model';

interface ICompanyBoolean {
  is_verified: boolean;
  is_active: boolean;
}

interface ICompanyContactInfo {
  email?: string;
  phone?: string;
  street?: string;
  street_number?: number;
  box?: string;
  city?: string;
  postal_code?: number;
  country?: string;
}

interface ICompany extends Document {
  name: string;
  verif_boolean: ICompanyBoolean;
  profile_pic?: string;
  contact_info?: ICompanyContactInfo;
  fields?: Array<string>;
  creation_date?: Date;
  creator_username?: string;
  admins?: Array<string>;
  worker?: Array<string>;
  registration_date?: Date;
  deletion_date?: Date;
  offers?: Array<string>; // _id des offres
  n_finished_contracts?: number;
}

const CompanyBooleanSchema: Schema = new Schema({
  is_verified: { type: Boolean, required: true, default: true }, // Mettre default: false quand backOffice sera fait
  is_active: { type: Boolean, required: true, default: true }
});

const CompanyContactInfoSchema: Schema = new Schema({
  email: { type: String },
  phone: { type: String },
  street: { type: String },
  street_number: { type: Number },
  box: { type: String },
  city: { type: String },
  postal_code: { type: Number },
  country: { type: String }
});

const companySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  verif_boolean: { type: CompanyBooleanSchema, required: true },
  profile_pic: { type: String },
  contact_info: CompanyContactInfoSchema,
  fields: { type: [String] },
  creation_date: { type: Date },
  creator_username: { type: String },
  admins: { type: [String] },
  worker: { type: [String] },
  registration_date: { type: Date },
  deletion_date: { type: Date },
  offers: { type: [String] },
  n_finished_contracts: { type: Number }
});


const CompanyModel = model<ICompany>('Company', companySchema);

export { CompanyModel, ICompany };