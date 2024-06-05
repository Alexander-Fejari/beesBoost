import { Router } from 'express';
import messageController from '../controllers/message.controller';

const router = Router();

router.get('/:userId', (req, res) => messageController.getMessages(req, res));
router.get('/message/:messageId', (req, res) => messageController.getMessageById(req, res));

router.post('/', (req, res) => messageController.sendMessage(req, res));

router.delete('/:messageId', (req, res) => messageController.deleteMessage(req, res));


export default router;