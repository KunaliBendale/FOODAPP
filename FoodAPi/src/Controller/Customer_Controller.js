import mongoose from "mongoose";
import { CreateCustomer, DelCustomer, doLogin, GetCustomer, UpdateProfile } from "../Repository/Customer_Repo.js";
import { Customer } from "../Models/Customer.js";
import { sendMessage } from "../MiddleWare/MessageMiddleware.js";
import bcrypt from 'bcrypt'
//Add Customer
const AddCustomer = async (req, res) => {
    try {
        console.log("Addcustomer is called");
        const customer = await CreateCustomer({ ...req.body, Photo: req.file.path });
        res.status(200).json(
            {
                data: customer,
                message: "Customer Added Successfully.."
            })
    } catch (error) {
        res.status(500).json(error)
    }
}

//Get All Customer
const GetAllCustomer = async (req, res) => {
    try {
        const AllCustomer = await GetCustomer();
        res.status(200).json({
            meassage: "Customers Are : ",
            data: AllCustomer
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


//Delete a Customer
const DeleteCustomer = async (req, res) => {
    try {
        const DeleteCustomer = await DelCustomer(req.body.CustId);
        res.status(200).json({
            message: "Customer Deleted Successfully..",
            data: DeleteCustomer
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const UpdateCustomerMobile = async (req, res) => {
    try {
        const UpdatedMb = await Customer.findOneAndUpdate({
            _id: req.body.CustomerId,
        }, {
            Mobile: req.body.Mobile,
        }, {
            new: true
        });

        res.status(200).json({
            message: "Customer Updated Successfully..",
            data: UpdatedMb
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateCustAddress = async (req, res) => {
    try {
        const UpdatedAd = await Customer.findOneAndUpdate({
            _id: req.body.CustomerId,
        }, {
            Address: req.body.Address,
        }, {
            new: true
        });

        res.status(200).json({
            message: "Customer Updated Successfully..",
            data: UpdatedAd
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

//Update Customer's Profile
const UpdateCustomerprofile = async (req, res) => {
    try {
        const result = await Customer.findOneAndUpdate(req.body)

        res.status(200).json({
            data: result
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


const customerLogin = async (req, res) => {
    try {
        let result = await doLogin(req.body)
        if (!result.success) return res.status(400).json(result)

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const sendOtp = async (req, res) => {
    const { Email } = req.body;
    console.log("email",Email);
    try {
        const user = await Customer.findOne({ Email });

        console.log(user);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(otp);
        user.otp = otp;
        user.otpExpires = Date.now() + 15 * 60 * 1000;
        await user.save();
        const message = `Your OTP is ${otp}. It will expire in 15 minutes`;
        const info = await sendMessage(user.Email, message);
        res.status(200).json({ success: true, message: "OTP sent successfully." });

    } catch (error) {
        res.status(500).json(error.message);
    }
}


const resetPassword = async (req, res) => {
    const { Email, otp, newPassword } = req.body;

    try {
        const user = await Customer.findOne({ Email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
        }

        console.log(`New Password: ${newPassword}`);
        const salt = await bcrypt.genSalt(10);
        console.log(`Salt: ${salt}`);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        console.log(`Hashed Password: ${hashedPassword}`);

        user.Password = hashedPassword;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password updated successfully." });
    } catch (error) {

        res.status(500).json(error.message);
    }
}

const updatePassword = async (req, res) => {
    try {
        const { Email, oldPassword, newPassword } = req.body;
        console.log(oldPassword);
        const user = await Customer.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Old password is incorrect.' });
        }

        let salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.Password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password updated successfully." })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export { AddCustomer, customerLogin, GetAllCustomer, DeleteCustomer, updateCustAddress, UpdateCustomerprofile, UpdateCustomerMobile, sendOtp, resetPassword, updatePassword }
