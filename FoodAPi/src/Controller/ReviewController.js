// AddReview
// GetAllReviews
// DeleteReview
// UodateReview
// GetReviewsByDishId
// GetAvarageRatingByDishId

import { Dish } from "../Models/Dishes.js";
import { Reviews } from "../Models/Reviews.js";

const AddReview = async (req, res) => {
    try {
        const review = await Reviews.create(req.body);
        res.status(200).json({
            message: "review submitted",
            data: review
        })
    } catch (error) {
        res.status(200).json(error)
    }

}


const GetAllReviews = async (req, res) => {
    try {
        const allReviews = await Reviews.find()

        res.status(200).json({
            data: allReviews
        })
    } catch (error) {

    }
}


const DeleteReview = async (req, res) => {
    try {
        const deletedReview = await Reviews.findByIdAndDelete(req.body)
        res.status(200).json({
            data: deletedReview
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const UpdateReview = async (req, res) => {
    try {
        const updatedReview = await Reviews.findOneAndUpdate(
            {
                _id: req.body.DishId
            },
            {
                Comment: req.body.Comment,
                Rating: req.body.Rating
            },
            {
                new: true
            })
        res.status(200).json(
            { data: updatedReview }
        )
    } catch (error) {
        res.status(500).json(error)
    }
}

const GetReviewsByDishId = async (req, res) => {
    try {
        const reviews = await Reviews.find({ DishId: req.body.DishId })
        res.status(200).json(
            { data: reviews }
        )
    } catch (error) {
        res.status(500).json(error)
    }
}


// const GetAverageRatingByDishId = async (req, res) => {
//     try {

//         const AverageRating = await Reviews.find({ DishId: req.body.DishId })

//         const avgRating = AverageRating.map((dish) => {
//             return dish.Rating;
//         })
//         console.log(avgRating);

//         let total = 0;

//         for (let i = 0; i < avgRating.length; i++) {
//             total = Number(total + avgRating[i]);
//         }
//         const avg = total / avgRating.length

//         console.log("total :", total, "Avg :", avg);


//         res.status(200).json({ message: "success", data: avg })
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

const getAverageRating = async (req, res) => {
    try {
       
        const AverageRating = await Reviews.aggregate([
            {
                $group: {
                    _id: "$DishId",
                    averageratings: { $avg: "$Rating" }
                }
            }
        ]);
        
        const populatedReviews= await Dish.populate(AverageRating,{path:'_id'})
        res.status(200).json({ data: populatedReviews })
    } catch (error) {
        res.status(200).json(error)
    }
}


export { AddReview, GetAllReviews, DeleteReview, UpdateReview, GetReviewsByDishId ,getAverageRating }
