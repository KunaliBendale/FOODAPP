import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import { updateStatus } from "../apicalls/orderApi";

const OrderDetails = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const data = useLocation().state;

  if (!data) {
    return <Typography variant="h6" color="error">No order data available</Typography>;
  }

  const updateOrderStatus = async () => {
    try {
      let statusReqData = {
        orderid: data._id,
        OrderStatus: selectedStatus,
      };

      let result = await updateStatus(statusReqData);
      console.log(result);
      alert("Order Status Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update order status");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 3, borderRadius: 3, boxShadow: 5 }}>
        {/* Order Details */}
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Order Details
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography>Order ID: <strong>{data._id}</strong></Typography>
          <Typography>Order Date: <strong>{data.formattedOrderDate}</strong></Typography>
          <Chip label={data.OrderStatus} color="secondary" variant="filled" sx={{ fontSize: "16px" }} />
        </Box>

        {/* Customer & Order Info */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Customer Info */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Customer Info
              </Typography>
              <Typography>Name: {data.CustomerDetails?.Name || "N/A"}</Typography>
              <Typography>Email: {data.CustomerDetails?.Email || "N/A"}</Typography>
              <Typography>Mobile: {data.CustomerDetails?.Mobile || "N/A"}</Typography>
              <Typography>
                Address: {data.CustomerDetails?.Address || "N/A"} ({data.CustomerDetails?.Pincode || "N/A"}), 
                {data.CustomerDetails?.City || "N/A"}, {data.CustomerDetails?.State || "N/A"}
              </Typography>
            </Paper>
          </Grid>

          {/* Order Info */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Order Info
              </Typography>
              <Typography>Total Amount: ₹ {data.TotalAmount || "0"}</Typography>
              <Typography>No. of Items: {data.NoOfItems || "0"}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Dishes Ordered */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }} color="primary">
          Ordered Dishes
        </Typography>
        <Grid container spacing={2}>
          {data.DishDetails?.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={item.Image}
                  alt={item.DishName}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">{item.DishName}</Typography>
                  <Typography variant="body2">Category: {item.Category}</Typography>
                  <Typography variant="body2">Type: {item.DishType}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Update Order Status */}
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography variant="h6" color="primary">
            Update Order Status
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Button variant="contained" color="warning" onClick={() => setSelectedStatus("Pending")}>
            Pending
            </Button>
            <Button variant="contained" color="info" onClick={() => setSelectedStatus("In Transit")}>
              In Transit
            </Button>
            <Button variant="contained" color="success" onClick={() => setSelectedStatus("Delivered")}>
              Delivered
            </Button>
            <Button variant="contained" color="error" onClick={() => setSelectedStatus("Cancelled")}>
              Cancelled
            </Button>
          </Stack>

          {selectedStatus && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Selected Status: <strong>{selectedStatus}</strong>
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={updateOrderStatus}
            disabled={!selectedStatus}
          >
            Update Status
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderDetails;
