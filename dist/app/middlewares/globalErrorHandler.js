"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const globalErrorHandler = (err, req, res, next) => {
    // Mongoose ValidationError
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        const errorMessages = Object.values(err.errors).map((el) => ({
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
    if (err instanceof mongoose_1.default.Error.CastError) {
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
exports.default = globalErrorHandler;
