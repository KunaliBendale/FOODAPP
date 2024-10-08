import { CreateOrder,GetOrders,DelOrder } from "../Repository/Order_Repo.js";

const AddOrder=async(req,res)=>{
    try {
        const AddedOrder=await CreateOrder(req.body);
        res.status(200).json({
            message:"Order Added Successfully",
            data: AddedOrder})
    } catch (error) {
        res.status(500).json(error)
    }
}


const GetAllOrders = async (req,res)=>{
    try {
        const AllOrders=await GetOrders();
        res.status(200).json({
            message:"Orders Are : ",
            data:AllOrders})
    } catch (error) {
        res.status(500).json(error)
    }    
}


const DeleteOrder = async (req,res)=>{
    try {
        const DeletedOrder=await DelOrder(req.body.OrderId);
        res.status(200).json({
            message:"Order Deleted Successfully..",
            data:DeletedOrder })
    } catch (error) {
        res.status(500).json(error)
    }    
}
export {AddOrder,GetAllOrders,DeleteOrder}