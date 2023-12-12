import {db} from "../../models/index.js";
//import { Sequelize } from 'sequelize';

const {Review, User}= db;

export class ReviewsRepository{
    findAllReviews=async()=>{
        const reviews =await Review.findAll({
            attributes:[
                "id",
               
                //추후에 주석 제거할 예정
                "userId", 
                "sitterId",
                "comment",
               //[Sequelize.col('user.name'), 'userName'],
                "grade",
                "createdAt",
                "updatedAt",
            ],
           // include: { model: User, as: 'user', attributes: [] },
        });
        
        return reviews;
    }

    findReviewById =async(reviewId)=>{
        const review =await Review.findByPk(reviewId,{
            attributes:[
                "id",
                //추후에 주석 제거할 예정
                "userId",
                "sitterId",
                "comment",
                //[Sequelize.col('user.name'), 'userName'],
                "grade",
                "createdAt",
                "updatedAt",
            ],
           // include: { model: User, as: 'user', attributes: [] },
        });

        return review;
    }

    createReview = async(userId,sitterId,comment,grade)=>{
        const createdReview = await Review.create({userId,sitterId,comment,grade})
        return createdReview;
    }

    updateReview= async(reviewId,/*sitterId,*/comment,grade)=>{

      const updatedReview= await Review.update(
            {
               // ...(sitterId &&{sitterId}),
                ...(comment &&{comment}),
                ...(grade &&{grade}),
            },
            { where: {id: reviewId}},
        );
        
        return updatedReview;
    }

    deleteReview= async(reviewId)=>{
        const deletedReview=await Review.destroy({where:{id:reviewId}});
        return deletedReview;
    }
}