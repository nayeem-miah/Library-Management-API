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
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../modular/books.model");
const bookRouter = express_1.default.Router();
// post a book
bookRouter.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = req.body;
        const result = yield books_model_1.Book.create(newBook);
        res.status(201).json({
            success: true,
            message: "Books created success",
            data: result
        });
    }
    catch (error) {
        console.error("something is wrong ", error);
        res.status(500).json({
            success: false,
            message: "something is wrong!",
            error: error
        });
    }
}));
//  get all books
bookRouter.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter ? req.query.filter : "";
        let result;
        if (filter) {
            result = yield books_model_1.Book.find({ genre: filter });
            res.status(200).json({
                success: true,
                message: "Books retrieved successfully",
                data: result,
            });
        }
        else {
            result = yield books_model_1.Book.find();
            res.status(200).json({
                success: true,
                message: "Books retrieved successfully",
                data: result,
            });
        }
    }
    catch (error) {
        console.error("something is wrong", error);
        res.status(500).json({
            success: false,
            message: "something is wrong",
            error: error
        });
    }
}));
// get a book by id
bookRouter.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const result = yield books_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: result
        });
    }
    catch (error) {
        console.error("something is wrong", error);
        res.status(500).json({
            success: false,
            message: "something is wrong",
            error: error
        });
    }
}));
// update a book by id
bookRouter.patch("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedData = req.body;
        const result = yield books_model_1.Book.findByIdAndUpdate(bookId, updatedData, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: result
        });
    }
    catch (error) {
        console.error("something is wrong", error);
        res.status(500).json({
            success: false,
            message: "something is wrong",
            error: error
        });
    }
}));
// deleted a book by id
bookRouter.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const result = yield books_model_1.Book.findByIdAndDelete(bookId);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Book updated successfully",
                data: result
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
    }
    catch (error) {
        console.error("something is wrong", error);
        res.status(500).json({
            success: false,
            message: "something is wrong",
            error: error
        });
    }
}));
exports.default = bookRouter;
