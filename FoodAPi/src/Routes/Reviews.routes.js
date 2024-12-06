import express from 'express'
import {AddReview , GetAllReviews,DeleteReview,UpdateReview,GetReviewsByDishId,GetAverageRatingByDishId,getAverageRating} from '../Controller/ReviewController.js'
 
const reviewRouter =express.Router()

reviewRouter.post("/addreview",AddReview);
reviewRouter.get("/getreviews",GetAllReviews);
reviewRouter.post("/delreview",DeleteReview);
reviewRouter.post("/updatereview",UpdateReview);
reviewRouter.post("/getreviewbydishid",GetReviewsByDishId);
reviewRouter.post("/getaverageRatingByDishId",GetAverageRatingByDishId);
reviewRouter.post("/getaverageRating",getAverageRating);

export {reviewRouter}