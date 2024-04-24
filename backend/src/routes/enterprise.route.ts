import express, { Router } from 'express';
import EnterpriseController from '../controllers/enterprise.controller';

const router: Router = express.Router();

router.post('/', EnterpriseController.addEnterpriseProfile);
router.get('/', EnterpriseController.getEnterpriseProfiles);

export default router;