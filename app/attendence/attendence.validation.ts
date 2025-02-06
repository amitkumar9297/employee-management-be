import { body, param } from 'express-validator';

export const createAttendanceValidator = [
    body('employeeId')
        .isMongoId()
        .withMessage('Employee ID must be a valid MongoDB Object ID'),
    body('date')
        .isISO8601()
        .withMessage('Date must be a valid date in ISO 8601 format')
        .toDate(),
    body('status')
        .isIn(['present', 'absent', 'leave'])
        .withMessage('Status must be either present, absent, or leave'),
    body('inTime')
        .optional()
        .isISO8601()
        .withMessage('In time must be a valid date in ISO 8601 format')
        .toDate(),
    body('outTime')
        .optional()
        .isISO8601()
        .withMessage('Out time must be a valid date in ISO 8601 format')
        .toDate(),
];

export const updateAttendanceValidator = [
    param('id').notEmpty().withMessage('Attendance ID is required'),
    body('status').optional().isIn(['present', 'absent', 'leave']).withMessage('Status must be one of: present, absent, leave'),
    body('inTime')
        .optional()
        .isISO8601()
        .withMessage('In time must be a valid date in ISO 8601 format')
        .toDate(),
    body('outTime')
        .optional()
        .isISO8601()
        .withMessage('Out time must be a valid date in ISO 8601 format')
        .toDate(),
];
