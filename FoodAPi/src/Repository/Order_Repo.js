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

const getOrdersByOrderStatus = async (OrderStatus) => {
    try {
        const orders = await Order.find({OrderStatus})
            .populate("CustomerId")
            .populate("items.dishid")
        console.log(orders);
        return orders
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


const GetOrdersByCustIdStatus = async ({ CustomerId ,OrderStatus}) => {
    try {
        return await Order.find({ CustomerId,OrderStatus })
            .populate("CustomerId")
            .populate("items.dishid")
    } catch (error) {
        return error
    }
}





export { CreateOrder, GetOrders, DelOrder, GetOrdersByCustIdStatus, getOrdersByOrderStatus }