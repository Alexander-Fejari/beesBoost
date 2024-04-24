"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.closeDatabase = exports.getClient = exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGODB_URI || '';
const dbName = process.env.DB_NAME || '';
let client;
let db;
async function connectToDatabase() {
    try {
        client = await mongodb_1.MongoClient.connect(uri);
        console.log("Connecté a la DB ma biche");
        exports.db = db = client.db(dbName);
        return db;
    }
    catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error;
    }
}
exports.connectToDatabase = connectToDatabase;
function getClient() {
    if (!client) {
        throw new Error('MongoDB client is not connected');
    }
    return client;
}
exports.getClient = getClient;
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
exports.closeDatabase = closeDatabase;
