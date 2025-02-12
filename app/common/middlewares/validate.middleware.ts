import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // Return 400 Bad Request with validation errors
        res.status(400).json({
            status: 'error',
            errors: errors.array(),
        });
        return ;
    }
    
    // Proceed to the next middleware/route handler if there are no errors
    next();
};
