import { Schema, model, Document } from 'mongoose';

interface IOfferAddress {
  street?: string;
  street_number?: number;
  box?: string;
  city?: string;
  postal_code?: number;
  country?: string;
}

interface IMissionBody {
  description?: string;
  requirements?: Array<string>;
  nice_to_have?: Array<string>;
  benefits?: Array<string>;
}

interface ICOffer extends Document {
  poster_id?: string;
  company_name?: string;
  field?: string;
  function?: string;
  creation_date?: Date;
  start_date?:  Date;
  duration?: number; // Nombre de jours
  CV?: string;
  promoted?: boolean;
  promotion_expiration?: Date;
  title?: string;
  body?: IMissionBody;
  address?: IOfferAddress;
  taker_id?: string;
  status?: string;
}

const OfferAddressSchema: Schema = new Schema({
  street: { type: String },
  street_number: { type: Number },
  box: { type: String },
  city: { type: String },
  postal_code: { type: Number },
  country: { type: String }
});

const MissionBodySchema: Schema = new Schema({
  description: { type: String },
  requirements: { type: [String] },
  nice_to_have: { type: [String] },
  benefits: { type: [String] }
});

const COfferSchema: Schema = new Schema({
  poster_id: { type: String },
  company_name: { type: String },
  field: { type: String },
  function: { type: String },
  creation_date: { type: Date, default: Date.now },
  start_date: { type: Date },
  duration: { type: Number },
  CV: { type: String },
  promoted: { type: Boolean },
  promotion_expiration: { type: Date },
  title: { type: String },
  body: MissionBodySchema,
  address: OfferAddressSchema,
  taker_id: { type: String },
  status: { type: String }
});


const COfferModel = model<ICOffer>('CompanyOffers', COfferSchema);

export { COfferModel, ICOffer };