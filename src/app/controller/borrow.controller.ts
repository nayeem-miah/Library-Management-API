import express, { Request, Response } from "express";
import { Book } from "../modular/books.model";
import Borrow from "../modular/borrow.modeler";
export const borrowRouter = express.Router();


borrowRouter.post("/borrow", async (req: Request, res: Response) => {
    try {
        const borrowData = req.body;
        const bookId = req.body.book;
        const book = await Book.findById(bookId);
        if (book?.copies) {
            if (book?.copies < borrowData?.quantity) {
                return res.status(404).json({
                    success: false,
                    message: "not enough copies !",
                })
            }
        }

        if (book?.copies === 0) {
            const updateDoc = Book.findOneAndUpdate({ _id: bookId }, { available: false }, { new: true }); return res.status(201).json({
                success: true,
                message: "book is not available",
                data: updateDoc
            })
        }

        const result = await Borrow.create(borrowData)
        res.status(201).json({
            success: true,
            message: "borrow inserted success",
            data: result
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "something is wrong ",
            error: error
        })
    }

});

