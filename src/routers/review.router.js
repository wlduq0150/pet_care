import express from 'express';
import {ReviewsController} from "../controllers/review.controller.js";
import { isAuth } from "../../middlewares/authMiddleware.js";

const reviewRouter = express.Router();

const reviewsController = new ReviewsController();

reviewRouter.get("/", reviewsController.getReviews);

reviewRouter.get("/myReviews",isAuth,reviewsController.getMyReviews);

reviewRouter.get("/:reviewId", reviewsController.getReviewById);

reviewRouter.get("/sitterId/:sitterId", reviewsController.getReviewByUserId);

reviewRouter.get("/sitter/grade/:sitterId",reviewsController.getReviewsSitterGrade);

reviewRouter.post("/",isAuth,reviewsController.createReview);

reviewRouter.put("/:reviewId",isAuth,reviewsController.updateReview);

reviewRouter.delete("/:reviewId",isAuth,reviewsController.deleteReview);

export {
    reviewRouter
};