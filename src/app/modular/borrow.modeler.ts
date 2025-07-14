import { model, Schema } from "mongoose"
import { Borrow } from "../interfaces/borrow.interface"

const BorrowSchema = new Schema<Borrow>({
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
})

const Borrow = model<Borrow>("Borrow", BorrowSchema)
export default Borrow