import express from 'express';
import {ReviewsController} from "../controllers/reviews.controller.js";

const reviewRouter =express.Router();

const reviewsController =new ReviewsController();

reviewRouter.get("/",reviewsController.getReviews);

reviewRouter.get("/:reviewId",reviewsController.getReviewById);

reviewRouter.post("/",reviewsController.createReview);

reviewRouter.put("/:reviewId",reviewsController.updateReview);

reviewRouter.delete("/:reviewId",reviewsController.deleteReview);

export {reviewRouter};