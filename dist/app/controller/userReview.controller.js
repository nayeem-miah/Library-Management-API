"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userReview_model_1 = __importDefault(require("../modular/userReview.model"));
const UserReviewRouter = express_1.default.Router();
UserReviewRouter.post("/reviews", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userReview_model_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
}));
UserReviewRouter.get("/reviews", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield userReview_model_1.default.find();
        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
}));
exports.default = UserReviewRouter;
