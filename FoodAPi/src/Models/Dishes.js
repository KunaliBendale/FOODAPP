import mongoose from "mongoose";

const DisheSchema = mongoose.Schema({
    DishName: {
        type: String,
        required: [true, "Dish name is required"],
    },
    Price: {
        type: String,
        required: [true, "Price is required"],
    },
    DishType: {
        type: String,
    },
    Category: {
        type: String,
    },
    Image: {
        type: String,
    },
    ImageId: {
        type: String,
    },
    IsAvailable: {
        type: Boolean,
        default: true
    },
   
})

export const Dish = mongoose.model("Dish", DisheSchema);



