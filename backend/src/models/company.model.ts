import { Schema, model, Document } from 'mongoose';

interface ICompany extends Document {

}

const companySchema = new Schema({

});

const CompanyModel = model<ICompany>('Companies', companySchema);

export { CompanyModel, ICompany };