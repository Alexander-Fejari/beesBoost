"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.getConnection = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbUri = process.env.MONGODB_URI || '';
const dbName = process.env.DB_NAME || '';
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect(dbUri, {
            dbName: dbName
        });
        console.log(`Connecté à la base de données ${dbName}`);
        return mongoose_1.default.connection;
    }
    catch (error) {
        console.error(`Erreur de connexion à la base de données ${dbName} :`, error);
        throw error;
    }
}
exports.connectToDatabase = connectToDatabase;
function getConnection() {
    return mongoose_1.default.connection;
}
exports.getConnection = getConnection;
async function closeDatabase() {
    try {
        await mongoose_1.default.disconnect();
        console.log('Déconnecté de la base de données');
    }
    catch (error) {
        console.error('Erreur lors de la fermeture de MongoDB :', error);
        throw error;
    }
}
exports.closeDatabase = closeDatabase;
