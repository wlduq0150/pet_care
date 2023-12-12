import express from 'express';
import {ReviewsController} from "../controllers/reviews.controller.js";

const router =express.Router();

const reviewsController =new ReviewsController();

router.get("/",reviewsController.getReviews);

router.get("/:reviewsId",reviewsController.getReviewsById);

router.post("/",reviewsController.createReviews);

router.put("/:reviewsId",reviewsController.updateReviews);

router.delete("/:reviewsId",reviewsController.deleteReviews);

export default router;