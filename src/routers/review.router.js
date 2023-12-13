import express from 'express';
import {ReviewsController} from "../controllers/review.controller.js";

const reviewRouter =express.Router();

const reviewsController =new ReviewsController();

reviewRouter.get("/",reviewsController.getReviews);

reviewRouter.get("/:reviewId",reviewsController.getReviewById);

reviewRouter.get("/userId/:userId",reviewsController.getReviewByUserId);

reviewRouter.post("/",reviewsController.createReview);

reviewRouter.put("/:reviewId",reviewsController.updateReview);

reviewRouter.delete("/:reviewId",reviewsController.deleteReview);

export {reviewRouter};