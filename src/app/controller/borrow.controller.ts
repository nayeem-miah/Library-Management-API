import express, { Request, Response } from "express";
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

//  get all borrow data
borrowRouter.get("/borrow", async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookData"
                }
            },
            {
                $unwind: "$bookData"
            }, {
                $project: {
                    _id: 0,
                    bookId: "$_id",
                    title: "$bookData.title",
                    isbn: "$bookData.isbn",
                    totalQuantity: 1
                }
            }
        ])
        res.status(200).json({
            success: true,
            message: "Borrow retrieved successfully",
            data: summary,
        })

    } catch (error: object | any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "something is wrong ",
            error: error.message || "Internal Server Error"
        })
    }
})

borrowRouter.get("/get-all-data", async (req: Request, res: Response) => {
    try {
        const result = await Borrow.find().populate("book")
        res.status(200).json({
            success: true,
            message: "Borrow retrieved successfully",
            data: result,
        })
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "something is wrong ",
            error: error.message || "Internal Server Error"
        })

    }
})
