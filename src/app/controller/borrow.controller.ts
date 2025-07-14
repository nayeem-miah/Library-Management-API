import express, { Request, Response } from "express";
import BorrowModel from "../modular/borrow.moduler";
const borrowRouter = express.Router();


borrowRouter.post("/borrow", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.boo
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "something is wrong ",
            error: error
        })
    }

})