import { body } from 'express-validator';

export const createLeaveValidation = [
    body('employeeId').isMongoId().withMessage('Employee ID must be valid'),
    body('startDate').isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').isISO8601().withMessage('End date must be a valid date'),
    body('reason').notEmpty().withMessage('Reason is required'),
];

export const updateLeaveValidation = [
    body('status').isIn(['pending', 'approved', 'rejected']).withMessage('Status must be one of: pending, approved, or rejected'),
];
