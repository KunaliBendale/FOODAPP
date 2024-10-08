import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    OrderDate: {
        type: Date,
        default: new Date(),
    },
    OrderStatus: {
        type: String,
        required: [true, "Order status is required"]
    },
    TotalAmount: {
        type: Number,
    },
    NoOfItems: {
        type: Number
    },
    CustomerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, "Customer ID is required"]
    },
    items: [{
        dishid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dish",
        },
        Qty: Number
    }]
})

export const Order = mongoose.model("Order", OrderSchema);


