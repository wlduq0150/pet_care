import {db} from "../../models/index.js";
import { Sequelize } from 'sequelize';
const op = Sequelize.Op;

const {Review, User}= db;

export class ReviewsRepository{
    findAllReviews=async()=>{
        const reviews =await Review.findAll({});
    
       return await Promise.all( reviews.map(async(review)=>{
        const user= await User.findByPk(review.userId);
        const sitter= await User.findByPk(review.sitterId);
        return {
            review: review,
            userName: user.name,
            sitterName: sitter.name,
        }
        }))

    }

    findReviewById =async(reviewId)=>{
        const review =await Review.findByPk(reviewId);
        const userName =await User.findByPk(review.userId);
        const sitterName =await User.findByPk(review.sitterId);
       
        return {
           review: review,
           userName: userName.name,
           sitterName: sitterName.name};
    }
    
    findReviewByUserId=async(sitterId)=>{
        const reviews =await Review.findAll({
            where:{
                sitterId:+sitterId
                }
        });
        
        return reviews
    }
    
    createReview = async(userId,sitterId,comment,grade)=>{
        const createdReview = await Review.create({userId,sitterId,comment,grade})
        return createdReview;
    }

    updateReview= async(reviewId,comment,grade)=>{

       await Review.update(
            {
                ...(comment &&{comment}),
                ...(grade &&{grade}),
            },
            { where: {id: reviewId}},
        );

        return review;
    }

    deleteReview= async(reviewId)=>{
        const deletedReview=await Review.destroy({where:{id:reviewId}});
        return deletedReview;
    }
}