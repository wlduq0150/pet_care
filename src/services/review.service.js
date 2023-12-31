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
                id: review.review.id,
                userName: review.userName,
                sitterName :review.sitterName,
                comment: review.review.comment,
                grade: review.review.grade,
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
            id: review.review.id,
            userName: review.userName,
            sitterName: review.sitterName,
            comment: review.review.comment,
            grade: review.review.grade,
        };
    };

    findReviewByUserId=async(sitterId)=>{
        const reviews =await this.reviewsRepository.findReviewByUserId(sitterId);

        if(!reviews.length){
            return false;
        }

        return reviews.map((review)=>{
            return {
                
                id: review.id,
                userName: review.user_reviews,
                sitterName:review.sitter_reviews,
                comment: review.comment,
                grade: review.grade,
            };
        });

    }

    getReviewsSitterGrade=async(sitterId)=>{
        const sitterReviews =await this.reviewsRepository.findReviewByUserId(sitterId);

        if(sitterReviews.length==0){
           return "없음";
        }
        
        let sumSitterGrade;
        sitterReviews.map((e)=>{
            sumSitterGrade+=e.grade
        })
        const averageGrade= sumSitterGrade/sitterReviews.length

        return averageGrade;

    }

    findMyReviews=async(userId)=>{
        const userRole= await this.reviewsRepository.findUserRole(userId);

        if(userRole.role=="sitter"){
            const reviews =await this.reviewsRepository.findReviewByUserId(userId);

            return reviews.map((review)=>{
                return {
                    role: "sitter",
                    id: review.id,
                    userName: review.user_reviews,
                    sitterName:review.sitter_reviews,
                    comment: review.comment,
                    grade: review.grade,
                };
            });
        }

        const myReviews= await this.reviewsRepository.findMyReviews(userId);

        return myReviews;
    }
    
    createReview =async(bookId, userId,sitterId,comment,grade)=>{
        const createdReview =await this.reviewsRepository.createReview(
            bookId,
            userId,
            sitterId,
            comment,
            grade,
        );
        return {
            //추후 sitterId를 제거하고 아래 주석을 제거 할 예정
          //  sitterName: createdReview.sitterName,
            bookId: createdReview.bookId,
            sitterId: createdReview.sitterId,
            userId: createdReview,userId,
            comment: createdReview.comment,
            grade: createdReview.grade,
            createdAt: createdReview.createdAt, 
        };
    };

    updateReview =async(reviewId/*,sitterId*/,body)=>{
        const updatedReview = await this.reviewsRepository.updateReview(
           
            reviewId,
           // sitterId,
           body,
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