import { Dish } from "../Models/Dishes.js";
import { CreateDish ,GetDishes,DelDish} from "../Repository/Dishes_Repo.js";

const AddDishes=async(req,res)=>{
    try {
        const NewDish=await CreateDish({...req.body,Image:req.file.path})
        res.status(200).json({
            message:"New Dish Added Successfully",
            data:NewDish});
    } catch (error) {
        res.status(500).json(error);
    }
}


const GetAllDishes = async (req,res)=>{
    try {
        const AllDishes=await GetDishes();
        res.status(200).json({
            message:"DIshes Are : ",
            data:AllDishes})
    } catch (error) {
        res.status(500).json(error)
    }    
}


const DeleteDish = async (req,res)=>{
    try {
        const DeletedDish=await DelDish(req.body.DishId);
        res.status(200).json({
            message:"Dish Deleted Successfully..",
            data:DeletedDish})
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

export {AddDishes,GetAllDishes,DeleteDish,updateDishPrice}