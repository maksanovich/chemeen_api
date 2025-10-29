import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCompany = [
    body('type').notEmpty().withMessage('Type is required'),
    body('companyName').notEmpty().withMessage('Company name is required'),
    body('approvalNo').notEmpty().withMessage('Approval number is required'),
    body('address1').notEmpty().withMessage('Address 1 is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('pinCode').notEmpty().withMessage('PIN code is required'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }
        next();
    }
];

export const validatePI = [
    body('PINo').notEmpty().withMessage('PI Number is required'),
    body('PIDate').notEmpty().withMessage('PI Date is required'),
    body('exporterId').isNumeric().withMessage('Exporter ID must be numeric'),
    body('processorId').isNumeric().withMessage('Processor ID must be numeric'),
    body('consigneeId').isNumeric().withMessage('Consignee ID must be numeric'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }
        next();
    }
];
