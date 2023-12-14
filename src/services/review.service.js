import {ReviewsRepository} from "../repository/review.repository.js";

export class ReviewsService{
    reviewsRepository = new ReviewsRepository();

    findAllReviews = async()=>{
        const reviews =await this.reviewsRepository.findAllReviews();

        if(!reviews){
            return false;
        }

        reviews.sort((a,b)=>{
            return b.createdAt-a.createdAt;
        });
        
        return reviews.map((review)=>{
            return{
                id: review.id,
                //sitterName:review.sitterName,
                sitterId :review.sitterId,
                userId: review.userId,
                comment: review.comment,
                grade: review.grade,
            };
        });
    };

    findReviewById =async(reviewId)=>{
        const review =await this.reviewsRepository.findReviewById(reviewId);

        if(!review){
            return false;
        }
        return{
            //id는 추후에 지울 예정
            id: review.id,
            //추후 sitterId를 제거하고 아래 주석을 제거 할 예정
            // sitterName: review.sitterName,
            sitterId :review.sitterId,
            userId: review.userId,
            comment: review.comment,
            grade: review.grade,
        };
    };

    findReviewByUserId=async(userId)=>{
        const reviews =await this.reviewsRepository.findReviewByUserId(userId);

        if(!reviews.length){
            return false;
        }

        return reviews.map((review)=>{
            return{
                id: review.id,
                //sitterName:review.sitterName,
                sitterId :review.sitterId,
                grade: review.grade,
            };
        });

    }

    
    createReview =async(userId,sitterId,comment,grade)=>{
        const createdReview =await this.reviewsRepository.createReview(
            userId,
            sitterId,
            comment,
            grade,
        );
        return {
            //추후 sitterId를 제거하고 아래 주석을 제거 할 예정
          //  sitterName: createdReview.sitterName,
            sitterId: createdReview.sitterId,
            userId: createdReview,userId,
            comment: createdReview.comment,
            grade: createdReview.grade,
            createdAt: createdReview.createdAt, 
        };
    };

    updateReview =async(reviewId/*,sitterId*/,comment,grade)=>{
        const updatedReview = await this.reviewsRepository.updateReview(
           
            reviewId,
           // sitterId,
            comment,
            grade,
            );

        return {
             //추후 sitterId를 제거하고 아래 주석을 제거 할 예정
           // sitterName: updatedReview.sitterName,
           // sitterId: updatedReview.sitterId,
            comment: updatedReview.comment,
            grade: updatedReview.grade,
            createdAt: updatedReview.createdAt,
            updatedAt: updatedReview.updatedAt, 
        };
    };

    deleteReview =async(reviewId)=>{

       const deletedReview= await this.reviewsRepository.deleteReview(reviewId);
        return{
            id: deletedReview.id,
        };
    };

}