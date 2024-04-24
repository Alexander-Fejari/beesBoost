import { Collection } from 'mongodb';
import { db } from '../config/db';

export interface StudentProfile {
  user_id: string;
  name: string;
  school: string;
  function: string;
  location: string;
  contact_info: Record<string, any>;
  formation: any[];
  experience: any[];
  skills: any[];
  certification: any[];
  languages: any[];
}

const StudentModel = {
  async addStudentProfile(studentData: StudentProfile): Promise<string> {
    const collection: Collection<StudentProfile> = db.collection('students');
    const result = await collection.insertOne(studentData);

    return result.insertedId.toHexString();
  },
  async getStudentProfiles(): Promise<StudentProfile[]> {
    const collection: Collection<StudentProfile> = db.collection('students');
    const profiles = await collection.find({}).toArray();
    
    return profiles;
  },
};

export { StudentModel };