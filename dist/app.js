"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const books_controller_1 = __importDefault(require("./app/controller/books.controller"));
const borrow_controller_1 = require("./app/controller/borrow.controller");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
exports.app = (0, express_1.default)();
// Middleware to parse JSON bodies
exports.app.use(express_1.default.json());
dotenv_1.default.config();
// application router
exports.app.use("/api", books_controller_1.default);
exports.app.use("/api", borrow_controller_1.borrowRouter);
exports.app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: "Welcome to the Library Management System API",
        status: "success",
        data: {
            name: "Library Management System API",
            version: "1.0.0"
        }
    });
}));
exports.app.use(notFound_1.default);
exports.app.use(globalErrorHandler_1.default);
