import { format } from "path";
import { Order } from "../Models/Order.js";
import { CreateOrder, GetOrders, DelOrder, GetOrdersByCustIdStatus, getOrdersByOrderStatus } from "../Repository/Order_Repo.js";

const AddOrder = async (req, res) => {
    try {
        const AddedOrder = await CreateOrder(req.body);
        res.status(200).json({
            message: "Order Added Successfully",
            data: AddedOrder
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const GetAllOrders = async (req, res) => {
    try {
        const AllOrders = await GetOrders();
        res.status(200).json({
            message: "Orders Are : ",
            data: AllOrders
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const OrdersByStatus = async (req, res) => {
    try {
        const orders = await getOrdersByOrderStatus(req.body.OrderStatus);
        res.status(200).json({
            message: "Orders Are : ",
            data: orders
        })
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

const fetchSortedOrders = async (req, res) => {
    try {
        const { OrderStatus } = req.body;
        console.log(OrderStatus);
        const fetchedOrders = await Order.aggregate([

            {
                $match: {
                    OrderStatus: OrderStatus, // Filter orders by the provided OrderStatus
                },
            },
            {
                $sort: {
                    OrderDate: -1, // Sort by OrderDate in descending order (most recent first)
                },
            },
            {
                $lookup: {
                    from: "dishes", // Name of the dishes collection
                    localField: "items.dishid", // Field in Order that contains references to dishes
                    foreignField: "_id", // Field in the dishes collection to match
                    as: "DishDetails", // Name of the array where the matched dishes will be stored
                },
            },
            {
                $lookup: {
                    from: "customers", // Name of the customers collection
                    localField: "CustomerId", // Field in Order that references the customer
                    foreignField: "_id", // Field in the customers collection to match
                    as: "CustomerDetails", // Name of the array where the matched customer will be stored
                },
            },

            {
                $addFields: {
                    formattedOrderDate: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$OrderDate"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    OrderStatus: 1,
                    NoOfItems: 1,
                    TotalAmount: 1,
                    formattedOrderDate: 1,
                    DishDetails: 1, // Include dish details
                    CustomerDetails: { $arrayElemAt: ["$CustomerDetails", 0] }, // Get the first (and likely only) element
                },
            },

        ]);

        res.status(200).json({ data: fetchedOrders })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const DeleteOrder = async (req, res) => {
    try {
        const DeletedOrder = await DelOrder(req.body.OrderId);
        res.status(200).json({
            message: "Order Deleted Successfully..",
            data: DeletedOrder
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


const OrderByIdAndStatus = async (req, res) => {
    try {
        const result = await GetOrdersByCustIdStatus(req.body)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


const UpdateOrderStatus = async (req, res) => {
    try {
        const result = await Order.findOneAndUpdate(
            {
                _id: req.body.orderid
            },
            {
                OrderStatus: req.body.OrderStatus
            }, {
            new: true
        })
            .populate("items.dishid")
        res.status(200).json({
            data: result
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const totalRevenue = async (req, res) => {
    try {
        const result = await Order.aggregate([
            {
                $match: {
                    OrderStatus: "Delivered",
                }
            },
            // {
            //     $unwind: "$items" // Unwind the items array to process individual dishes
            // },
            {
                $group: {
                    _id: null, // No grouping key to calculate the total
                    totalRevenue: { $sum: "$TotalAmount" } // Sum up the TotalAmount field
                }
            }
        ])
        console.log(result);
        res.status(200).json({ data: result })
    } catch (error) {
        console.log(error.message);
    }
}


const getTopDishes = async (req, res) => {
    try {
        const topDishes = await Order.aggregate([
            
            {
                $match: { OrderStatus: "Delivered" },
            },
            {
                $unwind: "$items", 
            },
             
             {
                $lookup: {
                    from: "dishes", // 'dishes' collection
                    localField: "items.dishid", // The dish ID in the items array
                    foreignField: "_id", // The dish ID in the dishes collection
                    as: "dishDetails"
                }
            },
           
            {
                $unwind: "$dishDetails" // Each document will have a single dishDetail object
            },
            
            {
                $group: {
                    _id: "$items.dishid", // Group by dish ID
                    totalQuantity: { $sum: "$items.quantity" }, // Sum up the quantities
                    totalRevenue: { $sum: { $multiply: ["$items.quantity",{ $toDouble: "$dishDetails.Price" } ] } } // Calculate revenue per dish
                }
            },
            
            {
                $sort: {
                    totalQuantity: -1
                }
            },
            {
                $limit: 5
            },
          
            {
                $lookup: {
                    from: "dishes", // 'dishes' collection
                    localField: "_id", // The dish ID from the items array
                    foreignField: "_id", // The dish ID in the dishes collection
                    as: "dishDetails"
                }
            },
          
            {
                $project: {
                    dishId: "$_id",
                    totalQuantity: 1,
                    totalRevenue: 1,
                    dishDetails: { $arrayElemAt: ["$dishDetails", 0] } // Take the first matching dish detail
                }
            }
        ]);

        res.status(200).json({ data: topDishes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export { AddOrder, GetAllOrders, DeleteOrder, OrderByIdAndStatus, UpdateOrderStatus, OrdersByStatus, totalRevenue, fetchSortedOrders, getTopDishes }