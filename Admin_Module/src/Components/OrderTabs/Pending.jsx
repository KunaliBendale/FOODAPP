import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Delivered = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/fetchsortedorders", {
          OrderStatus: "Pending",
        });
        setOrders(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDeliveredOrders();
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", width: 120 },
    { field: "customerName", headerName: "Customer Name", width: 200 },
    { field: "OrderDate", headerName: "Date", width: 150 },
    { field: "OrderStatus", headerName: "Status", width: 150 },
    { field: "TotalAmount", headerName: "Total Amount (₹)", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/orderdetails", { state: params.row.originalData })}
        >
          View Details
        </Button>
      ),
    },
  ];

  console.log(orders);
  const rows = orders.map((order, index) => ({
    id: index + 1,
    customerName: order.CustomerDetails?.Name || "Unknown",
    OrderDate: order.formattedOrderDate,
    OrderStatus: order.OrderStatus,
    TotalAmount: `₹ ${order.TotalAmount}`,
    originalData: order, // Store full order data for navigation
  }));

  return (
    <Box sx={{ height: 400, width: "100%", mt: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15]}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default Delivered;
