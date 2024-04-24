"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = void 0;
const db_1 = require("../config/db");
async function getComments(req, res) {
    try {
        const collection = db_1.db.collection('comments');
        try {
            const data = await collection.find({}).toArray();
            res.json(data);
        }
        catch (err) {
            console.error('Error fetching data from MongoDB:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    catch (err) {
        console.error('Error connecting to MongoDB:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.getComments = getComments;
