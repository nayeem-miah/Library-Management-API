import express, { Request, Response } from 'express';
import { Book } from '../modular/books.model';
const bookRouter = express.Router();

// post a book
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
});

//  get all books
bookRouter.get("/books", async (req: Request, res: Response) => {
    try {
        const filter = req.query.filter ? req.query.filter : "";
        let result;
        if (filter) {
            result = await Book.find({ genre: filter })
            res.status(200).json({
                success: true,
                message: "Books retrieved successfully",
                data: result,
            })

        } else {
            result = await Book.find();
            res.status(200).json({
                success: true,
                message: "Books retrieved successfully",
                data: result,
            })
        }

    } catch (error) {
        console.error("something is wrong", error);
        res.status(500).json({
            success: false,
            message: "something is wrong",
            error: error
        })
    }
});

// get a book by id
bookRouter.get("/books/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const result = await Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: result
        })

    } catch (error) {
        console.error("something is wrong", error);
        res.status(500).json({
            success: false,
            message: "something is wrong",
            error: error
        })
    }
});

export default bookRouter;