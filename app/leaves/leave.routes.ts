import { Router } from 'express';
import { LeaveController } from './leave.controller';
import { validate } from '../common/middlewares/validate.middleware';
import { createLeaveValidation, updateLeaveValidation } from './leave.validation';

const router = Router();
const leaveController = new LeaveController();

router.post('/', createLeaveValidation, validate, leaveController.createLeave.bind(leaveController));
router.put('/:id', updateLeaveValidation, validate, leaveController.updateLeave.bind(leaveController));
router.get('/:employeeId', leaveController.getLeavesByEmployeeId.bind(leaveController));
router.get('/', leaveController.getAllLeaves.bind(leaveController));
router.delete('/:id', leaveController.deleteLeave.bind(leaveController));

export default router;
