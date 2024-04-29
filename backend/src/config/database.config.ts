import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUri = process.env.MONGODB_URI || '';
const dbName = process.env.DB_NAME || '';

async function connectToDatabase() {
  try {
    await mongoose.connect(dbUri, {
      dbName: dbName
    });
    console.log(`Connecté à la base de données ${dbName}`);
    return mongoose.connection;
  } catch (error) {
    console.error(`Erreur de connexion à la base de données ${dbName} :`, error);
    throw error;
  }
}

function getConnection() {
  return mongoose.connection;
}

async function closeDatabase() {
  try {
    await mongoose.disconnect();
    console.log('Déconnecté de la base de données');
  } catch (error) {
    console.error('Erreur lors de la fermeture de MongoDB :', error);
    throw error;
  }
}

export { connectToDatabase, getConnection, closeDatabase };