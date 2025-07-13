import express, { Request, Response } from 'express';
import { Book } from '../modular/books.model';
const bookRouter = express.Router();


bookRouter.post("/books", async (req: Request, res: Response) => {
    try {
        const newBook = req.body;
        const result = await Book.create(newBook);
        res.status(201).json({
            success: true,
            message: "Books created success",
            data: result
        })
    } catch (error) {
        console.error("something is wrong ", error);
        res.status(500).json({
            success: false,
            message: "something is wrong!",
            error: error
        })
    }
})
export default bookRouter;