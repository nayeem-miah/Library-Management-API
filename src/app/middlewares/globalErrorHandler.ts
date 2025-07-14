
import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    if (err instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(err.errors).map((el: any) => el.message);
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: messages,
        });
    }

    // CastError (Invalid ObjectId)
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            success: false,
            message: `Invalid ${err.path}: ${err.value}`,
        });
    }

    // Custom or general error
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

export default globalErrorHandler;
