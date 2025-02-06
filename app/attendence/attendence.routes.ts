import { Router } from 'express';
import { AttendanceController } from './attendence.controller';
import { validate } from '../common/middlewares/validate.middleware';
import { createAttendanceValidator, updateAttendanceValidator } from './attendence.validation';
import { CreateAttendanceDTO, UpdateAttendanceDTO } from './attendence.dto';
import { isAdminMiddleware } from '../common/middlewares/isAdmin.middleware';

const router = Router();
const attendanceController = new AttendanceController();

router.post('/', createAttendanceValidator ,validate, attendanceController.createAttendance.bind(attendanceController));
router.put('/:id', isAdminMiddleware, updateAttendanceValidator,validate, attendanceController.updateAttendance.bind(attendanceController));
router.get('/employee/:employeeId', attendanceController.getAttendanceByEmployeeId.bind(attendanceController));
router.get('/', attendanceController.getAllAttendance.bind(attendanceController));
router.delete('/:id', attendanceController.deleteAttendance.bind(attendanceController));

export default router;
