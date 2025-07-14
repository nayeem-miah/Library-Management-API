import express, { Request, Response } from "express";
import { Book } from "../modular/books.model";
import Borrow from "../modular/borrow.modeler";
export const borrowRouter = express.Router();


borrowRouter.post("/borrow", async (req: Request, res: Response) => {
    try {
        const borrowData = req.body;
        const bookId = req.body.book;
        // static method
        const updatedData = await Borrow.updatedCopiesAfterBorrow(bookId, borrowData?.quantity);
        const result = await Borrow.create(borrowData);
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

