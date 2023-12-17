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
                },
                include: {
                    model: User,
                    as: "sitter_reviews",
                    attributes: ["name"],
                },
        });
        
        return reviews
    }
    
    
    findMyReviews=async(userId)=>{
        const myReviews= await Review.findAll({
            where:{
                userId: userId
            },
            include:[{
                model :User,
                as:"sitter_reviews",
                attributes:["name"],
            },
        {
            model :User,
            as:"user_reviews",
            attributes:["name"],
        }],
        });

        return myReviews;
    }


    createReview = async(userId,sitterId,comment,grade)=>{
        const createdReview = await Review.create({userId,sitterId,comment,grade})
        return createdReview;
    }

    updateReview= async(reviewId,body)=>{
       await Review.update(
            {
             ...body,
            },
            { where: {id: reviewId}},
        );
        const review =await Review.findByPk(reviewId);
        return review;
    }

    deleteReview= async(reviewId)=>{
        const deletedReview=await Review.destroy({where:{id:reviewId}});
        return deletedReview;
    }
}