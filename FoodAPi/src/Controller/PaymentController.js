import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import shortid from "shortid";
import Payment from "../models/Payment.js"; // Your Payment model

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
 const RazorpayOrder = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: shortid.generate(),
            payment_capture: 1,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        const payment = new Payment({
            user_id: userId,
            amount: amount * 100,
            transactionId: razorpayOrder.id,
            status: "paid",
        });

        await payment.save();

        res.status(201).json({ success: true, order: razorpayOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Verify Razorpay payment
const verifyRazorpay = async (req, res) => {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        const shasum = crypto.createHmac("sha256", secret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if (digest !== req.headers["x-razorpay-signature"]) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        const event = req.body;
        if (event.event === "payment.captured") {
            const { order_id, payment_id } = event.payload.payment.entity;

            const payment = await Payment.findOneAndUpdate(
                { transactionId: order_id },
                { status: "Paid", transactionId: payment_id },
                { new: true }
            );

            if (!payment) {
                return res.status(404).json({ success: false, message: "Payment record not found" });
            }
        }

        res.status(200).json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export {RazorpayOrder,verifyRazorpay}