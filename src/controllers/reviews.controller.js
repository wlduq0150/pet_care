import {ReviewsService} from "../services/reviews.service.js";

export class ReviewsController{
    reviewsService =new ReviewsService();

    getReviews=async(req,res,next)=>{
        try{
            
        }catch(err){
            next(err);
        }
    }

    getReviewsById =async(req,res,next)=>{
        try{

        }catch(err){
            next(err);
        }
    }

    createReviews= async(req,res,next)=>{
        try{

        }catch(err){
            next(err);
        }
    }

    updateReviews=async(req,res,next)=>{
        try{

        }catch(err){
            next(err);
        }
    }

    deleteReviews= async(req,res,next)=>{
        try{

        }catch(err){
            next(err);
        }
    }
}