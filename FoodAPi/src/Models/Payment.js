import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true, // Ensures transaction ID is unique
    },
    status: {
        type: String,
        enum: ["Pending", "paid", "Failed"],
        default: "paid",
    },
    paymentMethod: {
        type: String,
        enum: ["UPI", "Credit Card", "Debit Card", "Net Banking"],
        default: "UPI",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Payment", PaymentSchema);
