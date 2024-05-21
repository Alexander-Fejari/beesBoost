import { Schema, model, Document } from 'mongoose';

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
  taker_id?: string;
  status?: string;
  offer_language?: string;
}

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
  taker_id: { type: String },
  status: { type: String },
  offer_language: { type: String }
});


const COfferModel = model<ICOffer>('CompanyOffers', COfferSchema);

export { COfferModel, ICOffer };