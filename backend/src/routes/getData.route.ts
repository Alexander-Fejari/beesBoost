import express from 'express';
import { getComments } from '../controllers/getData.controller';

const router = express.Router();

router.get('/', getComments);

export default router;

