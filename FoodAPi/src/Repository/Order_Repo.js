import { Order } from "../Models/Order.js"

const CreateOrder = async (params) => {
    try {
        const AddedOrder = await Order.create(params);
        return AddedOrder;
    } catch (error) {
        return (error);
    }
}


const GetOrders = async () => {
    try {
        const AllOrders = await Order.find()
            .populate("CustomerId")
            .populate("items.dishid")
        return AllOrders;
    } catch (error) {
        return (error)
    }
}


const DelOrder = async (OrderId) => {
    try {
        const DeletedOrder = await Order.findByIdAndDelete(OrderId);
        console.log(DeletedOrder);
        return DeletedOrder;
    } catch (error) {
        return (error);
    }
}


const GetOrdersByCustId = async ({ CustomerId }) => {
    try {
        return await Order.find({ CustomerId })
            .populate("CustomerId")
            .populate("items.dishid")
    } catch (error) {
        return error
    }
}


 


export { CreateOrder, GetOrders, DelOrder, GetOrdersByCustId }