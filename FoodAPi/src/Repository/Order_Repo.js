import {Order} from "../Models/Order.js"


const CreateOrder=async(params)=>{
    try {
        const AddedOrder=await Order.create(params);
        return AddedOrder;
    } catch (error) {
        console.log(error);
    }
}

const GetOrders=async()=>{
    try {
        const AllOrders=await Order.find()
        .populate("CustomerId","Name Email")
        .populate("items.dishid")
        return AllOrders;
    } catch (error) {
        console.log(error)
    }
}


const DelOrder=async(OrderId)=>{
    try {
        const DeletedOrder=await Order.findByIdAndDelete(OrderId);
        console.log(DeletedOrder);
        return DeletedOrder;
    } catch (error) {
        console.log(error);

    }
}
export {CreateOrder,GetOrders,DelOrder}