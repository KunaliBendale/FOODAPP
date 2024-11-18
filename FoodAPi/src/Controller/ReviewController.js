// AddReview
// GetAllReviews
// DeleteReview
// UodateReview
// GetReviewsByDishId
// GetAvarageRatingByDishId

import { Reviews } from "../Models/Reviews";

const AddReview = async (req, res) => {
    try {
        const review = await Reviews.create(req.body);
        res.status(200).json({
            message:"review submitted",
            data:review
        })
    } catch (error) {
        res.status(200).json(error)
    }

}

const GetAllReviews = async(req,res)=>{
    try {
        const allReviews= await Reviews.find()
        res.status(200).json({
            data:allReviews
        })
    } catch (error) {
        
    }
}


const DeleteReview = async(req,res)=>{
    try {
        const deletedReview= await Reviews.findByIdAndDelete(req.body)
        res.status(200).json({
            data:deletedReview
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const UpdateReview = async(req,res)=>{
    try {
        const updatedReview=await Reviews.findOneAndUpdate(
            {
                _id:req.body.DishId
            },
            {
                Rating: req.body.Rating
            },
            {
                new:true
            })
        res.status(200).json(
            {data:updatedReview}
        )
    } catch (error) {
        res.status(500).json(error)
    }
}

const GetReviewsByDishId =async(req,res)=>{
    try {
        const reviews = await Reviews.find(req.body)
        res.status(200).json(
            {data:reviews}
        )
    } catch (error) {
        res.status(500).json(error)    
    }
}


// const GetAverageRatingByDishId = async()=>{
//     try {
//         const AverageRating = await Reviews.find()
//     } catch (error) {
        
//     }
// }


export {AddReview , GetAllReviews,DeleteReview,UpdateReview,GetReviewsByDishId}
