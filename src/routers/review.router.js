import express from 'express';
import {ReviewsController} from "../controllers/review.controller.js";
import { isAuth } from "../../middlewares/authMiddleware.js";

const reviewRouter =express.Router();

const reviewsController =new ReviewsController();

reviewRouter.get("/",reviewsController.getReviews);

reviewRouter.get("/:reviewId",reviewsController.getReviewById);

reviewRouter.get("/userId/:userId",reviewsController.getReviewByUserId);

reviewRouter.post("/",isAuth,reviewsController.createReview);

reviewRouter.put("/:reviewId",isAuth,reviewsController.updateReview);

reviewRouter.delete("/:reviewId",isAuth,reviewsController.deleteReview);

export {reviewRouter};