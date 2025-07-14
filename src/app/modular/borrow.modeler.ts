import { model, Schema } from "mongoose"
import { Book } from "./books.model";
import { Borrow, BorrowStatics } from "../interfaces/borrow.interface";

const BorrowSchema = new Schema<Borrow, BorrowStatics>({
    book: {
        type: Schema.Types.ObjectId,
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
BorrowSchema.static("updatedCopiesAfterBorrow", async function (bookId: string, quantity: number) {
    const book = await Book.findById(bookId);
    if (!book) {
        throw new Error("Book not found");
    };
    if (book?.copies < quantity) {
        throw new Error("Not enough copies available")
    }
    book.copies = book.copies - quantity;
    if (book.copies === 0) {
        book.available = false;
    }
    await book.save();
})



const Borrow = model<Borrow, BorrowStatics>("Borrow", BorrowSchema)
export default Borrow