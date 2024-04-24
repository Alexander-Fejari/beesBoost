import { Request, Response } from 'express';
import { db } from '../config/db';

async function getComments(req: Request, res: Response) {
  try {
    const collection = db.collection('comments');
    try {
      const data = await collection.find({}).toArray();
      res.json(data);
    } catch (err) {
      console.error('Error fetching data from MongoDB:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { getComments };