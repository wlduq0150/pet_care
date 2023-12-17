import {ReviewsService} from "../services/review.service.js";

export class ReviewsController{
    reviewsService =new ReviewsService();

    getReviews=async(req,res,next)=>{
        try{
            const reviews =await this.reviewsService.findAllReviews();
            return res.status(200).json({
                ok:true,
                message:"리뷰 조회에 성공했습니다",
                data: reviews,
            })
        }catch(err){
            next(err);
        }
    }

    getReviewById =async(req,res,next)=>{
        try{
            const {reviewId} =req.params;
            const review =await this.reviewsService.findReviewById(reviewId);
            if(!review){
                const error = new Error("해당 리뷰는 존재하지 않습니다");
                error.status = 404;
                throw error;
              /*  return res.status(404).json({
                    ok:false,
                    message:"해당 리뷰는 존재하지 않습니다",
                });*/
            }
            
            return res.status(200).json({
                ok:true,
                message:"리뷰 조회에 성공했습니다.",
                data: review,
            });
        }catch(err){
            next(err);
        }
    }

    getReviewByUserId= async(req,res,next)=>{
        try{
            const {sitterId}=req.params;

            const review =await this.reviewsService.findReviewByUserId(sitterId);
          
            if(!review){
                return res.status(404).json({
                    ok:false,
                    message:"해당 시터의 리뷰는 존재하지 않습니다",
                });
            }
           
            return res.status(200).json({
                ok:true,
                message:"해당 시터의 리뷰 조회에 성공했습니다.",
                data: review,
            });
        }catch(err){
            next(err);
        }
    }

    getReviewsSitterGrade=async(req,res,next)=>{
        try{
            const {sitterId}=req.params;
            
            const sitterGrade=await this.reviewsService.getReviewsSitterGrade(sitterId);

            return res.status(200).json({
                ok:true,
                message:"해당 시터의 평점을 조회했습니다",
                data:sitterGrade,
            });
        }catch(err){
            next(err);
        }
    }

    getMyReviews= async(req,res,next)=>{
        try{
            const {userId}= req.user;


            const myReviews= await this.reviewsService.findMyReviews(userId);

            return res.status(200).json({
                ok:true,
                message:"내가 쓴 리뷰 조회에 성공했습니다.",
                data: myReviews,
            });
        }catch(err){
            next(err);
        }
    }

    createReview= async(req,res,next)=>{
        try{
           const {userId}= req.user;
            //console.log(userId);
            const {sitterId, comment, grade} =req.body;

            if(!sitterId){
                return res.status(400).json({
                    ok:false,
                    message:"리뷰 작성할 시터를 적어야 합니다",
                })
            }

            if(!comment){
                return res.status(400).json({
                    ok:false,
                    message:"리뷰 내용이 필요합니다",
                })
            }

            if(!grade){
                return res.status(400).json({
                    ok:false,
                    message:"리뷰 점수가 필요합니다",
                })
            }

            const createdReview =await this.reviewsService.createReview(
                userId,
                sitterId,
                comment,
                grade,
            )
            return res.status(201).json({
                ok:true,
                message:"리뷰 작성에 성공했습니다.",
                data: createdReview,
            })

        }catch(err){
            next(err);
        }
    }

    updateReview=async(req,res,next)=>{
        try{
           
            //아래 userId는 추후에 로그인한 유저 정보 받고 지울예정
            const {reviewId} =req.params;
            const {userId}= req.user;
            const {comment, grade} =req.body;

           console.log(req.body);
           
            if(/*!sitterId &&*/ !comment && !grade){
                return res.status(400).json({
                    ok:false,
                    message:"한가지 이상은 변경해야 합니다",
                });
            }

            //해당 리뷰가 있는지 확인
            const review =await this.reviewsService.findReviewById(reviewId);
            //없으면 아래 실행
            if(!review){
                return res.status(404).json({
                    ok:false,
                    message:"해당 리뷰는 존재하지 않습니다.",
                })
            }
            //내가 작성한 리뷰인지 확인 
            if(!review.userId==userId){
                return res.status(403).json({
                    ok:false,
                    message:"수정할 수 없는 리뷰입니다."
                })
            }
            //서비스로 보내기
            const updatedReview= await this.reviewsService.updateReview(
                reviewId,
              req.body,
            )

            return res.status(200).json({
                ok:true,
                message:"리뷰를 수정 하였습니다.",
                data: updatedReview,
            });
        }catch(err){
            next(err);
        }
    }

    deleteReview= async(req,res,next)=>{
        try{
            //아래 userId는 추후에 로그인한 유저 정보 받고 지울예정
            const {id:userId}= req.user
            const {reviewId} =req.params;

            //해당 리뷰가 있는지 확인
            const review =await this.reviewsService.findReviewById(reviewId);
            //없으면 아래 실행
            if(!review){
                return res.status(404).json({
                    ok:false,
                    message:"해당 리뷰는 존재하지 않습니다.",
                })
            }
            //내가 만든 리뷰인지 확인
            if(!review.userId==userId){
                return res.status(403).json({
                    ok:false,
                    message:"삭제할 수 없는 리뷰입니다."
                })
            }
           
            //서비스로 보내기
            const deletedReview= await this.reviewsService.deleteReview(reviewId)
            return res.status(200).json({
                ok:true,
                message:"리뷰를 삭제했습니다.", 
                data: deletedReview,   
            })
        }catch(err){
            next(err);
        }
    }
}