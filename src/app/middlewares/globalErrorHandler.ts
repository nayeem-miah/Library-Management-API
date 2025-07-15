// src/middlewares/globalErrorHandler.ts
import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Mongoose ValidationError
    if (err instanceof mongoose.Error.ValidationError) {
        const errorMessages = Object.values(err.errors).map((el: any) => ({
            path: el.path,
            message: el.message,
        }));

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errorMessages,
        });
    }

    // CastError (like invalid ObjectId)
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            success: false,
            message: "Invalid ID",
            errorMessages: [
                {
                    path: err.path,
                    message: `Invalid value: ${err.value}`,
                },
            ],
        });
    }

    // Default / Custom error
    return res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

export default globalErrorHandler;
