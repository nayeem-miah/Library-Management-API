
import { model, Schema } from "mongoose";
import { BookInterface } from "../interfaces/books.interfaces";

const bookSchema = new Schema<BookInterface>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    copies: {
        type: Number,
        required: true,
        default: 0
    }, available: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    });



export const Book = model("Book", bookSchema);