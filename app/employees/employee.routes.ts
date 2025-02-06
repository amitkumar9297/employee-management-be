import { Router } from 'express';
import { EmployeeController } from './employee.controller';
import {
    createEmployeeValidation,
    updateEmployeeValidation,
    getEmployeeByIdValidation,
    deleteEmployeeValidation,
} from './employee.validation';
import { validate } from '../common/middlewares/validate.middleware';
import { isAdminMiddleware } from '../common/middlewares/isAdmin.middleware';

const router = Router();
const employeeController = new EmployeeController();

router.post(
    '/',
    createEmployeeValidation,
    validate,
    isAdminMiddleware,
    employeeController.createEmployee.bind(employeeController)
);

router.get('/',isAdminMiddleware, employeeController.getAllEmployees.bind(employeeController));
router.get('/all', employeeController.fetchAllEmployees.bind(employeeController));

router.get(
    '/:id',
    getEmployeeByIdValidation,
    validate,
    employeeController.getEmployeeById.bind(employeeController)
);

router.put(
    '/:id',
    updateEmployeeValidation,
    validate,
    employeeController.updateEmployee.bind(employeeController)
);

router.delete(
    '/:id',
    deleteEmployeeValidation,
    validate,
    isAdminMiddleware,
    employeeController.deleteEmployee.bind(employeeController)
);

export default router;
