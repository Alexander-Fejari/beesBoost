// import { Collection } from 'mongodb';
// import { db } from '../config/db';

// export interface EnterpriseProfile {
//     creator_user_id: string;
//     user_ids_key: string[];
//     name: string;
//     field: string;
//     location: string;
//     contact_info: Record<string, any>;
//     offers: any[];
//   }
  

// const EnterpriseModel = {
//   async addEnterpriseProfile(enterpriseData: EnterpriseProfile): Promise<string> {
//     const collection: Collection<EnterpriseProfile> = db.collection('enterprises');
//     const result = await collection.insertOne(enterpriseData);

//     return result.insertedId.toHexString();
//   },
//   async getEnterpriseProfiles(): Promise<EnterpriseProfile[]> {
//     const collection: Collection<EnterpriseProfile> = db.collection('enterprises');
//     const profiles = await collection.find({}).toArray();
    
//     return profiles;
//   },
// };

// export { EnterpriseModel };