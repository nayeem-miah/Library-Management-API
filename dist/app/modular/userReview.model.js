"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userReviewSchema = new mongoose_1.Schema({
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
const UserReview = (0, mongoose_1.model)("UserReview", userReviewSchema);
exports.default = UserReview;
