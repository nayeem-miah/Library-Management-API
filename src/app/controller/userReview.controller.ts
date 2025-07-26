import express, { Request, Response } from 'express';
import UserReview from '../modular/userReview.model';
const UserReviewRouter = express.Router();

UserReviewRouter.post("/reviews", async (req: Request, res: Response) => {
    try {
        const result = await UserReview.create(req.body);
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }

});

UserReviewRouter.get("/reviews", async (req, res) => {
    try {
        const reviews = await UserReview.find();
        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
})





export default UserReviewRouter;