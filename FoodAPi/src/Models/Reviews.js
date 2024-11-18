import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    DishId: { type: mongoose.Types.ObjectId, ref: "Dish", required: true },
    CustomerId: { type: mongoose.Types.ObjectId, ref: "Customer", required: true },
    ReviewDate: { type: Date, default: new Date() },
    Comment: { type: String },
    Rating: { type: Number, required: true }
})

export const Reviews = mongoose.model("Reviews", ReviewSchema)