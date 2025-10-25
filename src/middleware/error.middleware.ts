import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.statusCode || error.status || 500;
    const message = error.message || 'Internal Server Error';
    
    // Log error for debugging
    console.error(`Error ${status}: ${message}`, error);
    
    // Send consistent error response
    response.status(status).json({
        success: false,
        status,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};
