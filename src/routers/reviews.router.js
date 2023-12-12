import express from 'express';
import {ReviewsController} from "../controllers/reviews.controller.js";

const router =express.Router();

const reviewsController =new ReviewsController();

router.get("/",reviewsController.getReviews);

router.get("/:reviewId",reviewsController.getReviewById);

router.post("/",reviewsController.createReview);

router.put("/:reviewId",reviewsController.updateReview);

router.delete("/:reviewId",reviewsController.deleteReview);

export default router;