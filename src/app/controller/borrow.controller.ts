import express, { Request, Response } from "express";
import { Book } from "../modular/books.model";
import Borrow from "../modular/borrow.modeler";
export const borrowRouter = express.Router();


borrowRouter.post("/borrow", async (req: Request, res: Response) => {
    try {
        const borrowData = req.body;
        const bookId = req.body.book;
        // static method
        const updatedDoc = await Borrow.updatedCopiesAfterBorrow(bookId, borrowData?.quantity)
        res.status(201).json({
            success: true,
            message: "borrow inserted success",
            data: borrowData,
            updateData: updatedDoc
        })
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "something is wrong ",
            error: error.message || "Internal Server Error"
        })
    }

});

