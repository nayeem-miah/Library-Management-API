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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const books_model_1 = require("./books.model");
const BorrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book ID is required"]
    },
    quantity: {
        type: Number,
        min: [0, "Quantity cannot be negative"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer"
        }, required: [true, "Quantity is required"]
    },
    dueDate: {
        type: Date,
        required: [true, "Date is required"],
    }
}, {
    versionKey: false,
    timestamps: true
});
// Static method to update book copies after borrowing
BorrowSchema.static("updatedCopiesAfterBorrow", function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield books_model_1.Book.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        ;
        if ((book === null || book === void 0 ? void 0 : book.copies) < quantity) {
            throw new Error("Not enough copies available");
        }
        book.copies = book.copies - quantity;
        if (book.copies === 0) {
            book.available = false;
        }
        yield book.save();
    });
});
const Borrow = (0, mongoose_1.model)("Borrow", BorrowSchema);
exports.default = Borrow;
