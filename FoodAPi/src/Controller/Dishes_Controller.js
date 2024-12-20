import { Dish } from "../Models/Dishes.js";
import { Reviews } from "../Models/Reviews.js";
import { CreateDish, GetDishes, DelDish } from "../Repository/Dishes_Repo.js";

const AddDishes = async (req, res) => {
    try {
        const NewDish = await CreateDish({ ...req.body, Image: req.file.path })
        res.status(200).json({
            message: "New Dish Added Successfully",
            data: NewDish
        });
    } catch (error) {
        res.status(500).json(error);
    }
}


const GetAllDishes = async (req, res) => {
    try {
        const AllDishes = await GetDishes();
        res.status(200).json({
            message: "DIshes Are : ",
            data: AllDishes
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


const DeleteDish = async (req, res) => {
    try {
        const DeletedDish = await DelDish(req.body.DishId);
        res.status(200).json({
            message: "Dish Deleted Successfully..",
            data: DeletedDish
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateDishPrice = async (req, res) => {
    try {
        const updatedPrice = await Dish.findOneAndUpdate({
            _id: req.body.dishid
        }, {
            Price: req.body.Price
        }, { new: true })
        res.status(200).json(updatedPrice)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getDishesWithAvgRating=async (req,res)=>{
    try {
       
        const AverageRating = await Reviews.aggregate([
            {
                $group: {
                    _id: "$DishId",
                    averageratings: { $avg: "$Rating" }
                }
            }
        ]);
        
        //const populatedReviews= await Dish.populate(AverageRating,{path:'_id'})

        const populatedDishes = await Dish.aggregate([
            {
                $lookup: {
                    from: 'reviews', // Join with the Reviews collection
                    localField: '_id', // Match DishId (from Dishes collection)
                    foreignField: 'DishId', // Match DishId (from Reviews collection)
                    as: 'reviews' // The alias for the populated data
                }
            },

            {
                $addFields: {
                    averageratings: {
                        $cond: {
                            if: { $gt: [{ $size: "$reviews" }, 0] }, // If there are reviews
                            then: { $avg: "$reviews.Rating" }, // Calculate average rating
                            else: 0 // Else set average rating to 0
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    DishName: 1, // Include other fields from the Dishes collection (e.g., name)
                    Price:1,
                    DishType:1,
                    Category:1,
                    Image:1,
                    ImageId:1,
                    IsAvailable:1,
                    averageratings: 1
                }
            }
        ]);

        res.status(200).json({ data: populatedDishes })
    } catch (error) {
        res.status(200).json(error)
    }
}

export { AddDishes, GetAllDishes, DeleteDish, updateDishPrice ,getDishesWithAvgRating}