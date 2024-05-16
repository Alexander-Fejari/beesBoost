import { Schema, model, Document } from 'mongoose';

interface ICOffers extends Document {

}

const cOffersSchema = new Schema({

});

const COffersModel = model<ICOffers>('CompanyOffers', cOffersSchema);

export { COffersModel, ICOffers };