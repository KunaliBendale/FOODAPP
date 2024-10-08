import { Dish } from "../Models/Dishes.js"
import { uploadOnCloudinary } from "../MiddleWare/Cloudinary_middleware.js";

const CreateDish = async (params) => {
    try {
        console.log("create Dish called");
        console.log(params);
        const { Image } = params;
        const cloudinaryres = await uploadOnCloudinary(Image);
        params.Image=cloudinaryres.secure_url;
        params.ImageId=cloudinaryres.public_id;

        const AddedDish = await Dish.create(params);
        return AddedDish;
    } catch (error) {
        console.log(error);
    }
}

const GetDishes = async () => {
    try {
        const Dishes = await Dish.find()
        return Dishes;
    } catch (error) {
        console.log(error);
    }
}

const DelDish = async (DishId) => {
    try {
        const DeletedDish = await Dish.findByIdAndDelete(DishId);
        return DeletedDish;
    } catch (error) {
        console.log(error);

    }
}
export { CreateDish, GetDishes, DelDish }