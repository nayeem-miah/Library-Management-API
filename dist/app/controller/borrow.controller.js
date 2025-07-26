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
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_modeler_1 = __importDefault(require("../modular/borrow.modeler"));
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowData = req.body;
        const bookId = req.body.book;
        // static method
        const updatedDoc = yield borrow_modeler_1.default.updatedCopiesAfterBorrow(bookId, borrowData === null || borrowData === void 0 ? void 0 : borrowData.quantity);
        // create borrow data
        const result = yield borrow_modeler_1.default.create(borrowData);
        res.status(201).json({
            success: true,
            message: "borrow inserted success",
            data: result,
            updateData: updatedDoc
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "something is wrong ",
            error: error.message || "Internal Server Error"
        });
    }
}));
//  get all borrow data
exports.borrowRouter.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_modeler_1.default.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookData"
                }
            },
            {
                $unwind: "$bookData"
            }, {
                $project: {
                    _id: 0,
                    book: "$_id",
                    title: "$bookData.title",
                    isbn: "$bookData.isbn",
                    totalQuantity: 1
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Borrow retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "something is wrong ",
            error: error.message || "Internal Server Error"
        });
    }
}));
exports.borrowRouter.get("/get-all-borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_modeler_1.default.find().populate("book");
        res.status(200).json({
            success: true,
            message: "Borrow retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "something is wrong ",
            error: error.message || "Internal Server Error"
        });
    }
}));
