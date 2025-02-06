import { Router } from 'express';
import { LogController } from './log.controller';
import { validate } from '../common/middlewares/validate.middleware';
import { CreateLogDTO, UpdateLogDTO } from './log.dto';

const router = Router();
const logController = new LogController();


router.post('/', validate, logController.createLog.bind(logController));
router.put('/:id', validate, logController.updateLog.bind(logController));
router.get('/:employeeId', logController.getLogsByEmployeeId.bind(logController));
router.get('/', logController.getAllLogs.bind(logController));
router.delete('/:id', logController.deleteLog.bind(logController));

export default router;
