import { body, param } from 'express-validator';

export const createEmployeeValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required and must be valid'),
    body('position').notEmpty().withMessage('Position is required'),
    body('department').notEmpty().withMessage('Department is required'),
    body('dateOfJoining').isISO8601().toDate().withMessage('Date of joining is required and must be a valid date'), // New validation
];

export const updateEmployeeValidation = [
    param('id').isMongoId().withMessage('Invalid employee ID format'),
    body('name').optional().notEmpty().withMessage('Name must not be empty'),
    body('email').optional().isEmail().withMessage('Email must be valid'),
    body('position').optional().notEmpty().withMessage('Position must not be empty'),
    body('department').optional().notEmpty().withMessage('Department must not be empty'),
    body('dateOfJoining').optional().isISO8601().toDate().withMessage('Date of joining must be a valid date'), // New validation
];

export const getEmployeeByIdValidation = [
    param('id').isMongoId().withMessage('Invalid employee ID format'),
];

export const deleteEmployeeValidation = [
    param('id').isMongoId().withMessage('Invalid employee ID format'),
];
