
import { model, Schema } from "mongoose";
import { BookInterface } from "../interfaces/books.interfaces";

const bookSchema = new Schema<BookInterface>({
    title: {
        type: String,
        required: [true, "Book title is required"],
        trim: true
    },
    author: {
        type: String,
        required: [true, "Book author is required"],
        trim: true
    },
    genre: {
        type: String,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        required: [true, "Book genre is required"]
    },
    isbn: {
        type: String,
        required: [true, "Book ISBN is required"],
        trim: true,
        unique: true
    },
    description: String,
    copies: {
        type: Number,
        required: [true, "Copies is required"],
        min: [0, "Copies cannot be negative"],
        validate: {
            validator: Number.isInteger,
            message: "Copies must be an integer"
        }
    }, available: {
        type: Boolean,
        required: true,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    });



export const Book = model<BookInterface>("Book", bookSchema);