import express, { Router } from 'express';
import StudentController from '../controllers/student.controller';

const router: Router = express.Router();

router.post('/', StudentController.addStudentProfile);
router.get('/', StudentController.getStudentProfiles);

export default router;
