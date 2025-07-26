import { model, Schema } from "mongoose";
import { IUerReview } from "../interfaces/userReview.interface";

const userReviewSchema = new Schema<IUerReview>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }

});

const UserReview = model<IUerReview>("UserReview", userReviewSchema);
export default UserReview;