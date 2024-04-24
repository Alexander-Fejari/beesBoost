import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGODB_URI || '';
const dbName = process.env.DB_NAME || '';

let client: MongoClient;
let db: Db;

async function connectToDatabase() {
  try {
    client = await MongoClient.connect(uri);
    console.log("Connecté a la DB ma biche");
    db = client.db(dbName);
    
    return db;
  } 
  catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}

function getClient() {
  if (!client) {
    throw new Error('MongoDB client is not connected');
  }
  return client;
}

async function closeDatabase() {
  try {
    if (client) {
      await client.close();
      console.log('Déconnecté de la DB');
    }
  } 
  catch (error) {
    console.error('Error closing MongoDB:', error);
    throw error;
  }
}

export { connectToDatabase, getClient, closeDatabase, db };