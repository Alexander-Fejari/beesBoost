import { Request, Response } from 'express';
import { WorkerModel } from '../../models/user/worker.model';
import UserController from './user.controller';

class WorkerController extends UserController {
  async updateIsAdmin(req: Request, res: Response): Promise<void> {
    this.updateField(req, res, WorkerModel, `is_admin`);
  }
}

export default WorkerController;