import { Collection, ObjectId } from 'mongodb';
import { connectToDatabase } from '../config/db';

export interface User {
  username: string;
  profile_pic: string;
  role: string;
  email: string;
}

const UserModel = {
  async addUser(userData: User): Promise<string> {
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection('users');
    const result = await collection.insertOne(userData);
    return result.insertedId.toHexString();
  },
  async getUsers(): Promise<User[]> {
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection('users');
    const users = await collection.find({}).toArray();
    return users;
  },
};

export { UserModel };
