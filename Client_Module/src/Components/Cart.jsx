import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseqty,
  decreaseqty,
  removeItem,
  calculatetotal,
  clearCart,
} from "../Reduxwork/Cartslice";
import { createOrder } from "../apicalls/ordersApi";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";


const Cart = () => {
  const { cart, carttotal } = useSelector((state) => state.cart);
  const { userdata } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState(userdata?.address || "");
  const [loadingPayment, setLoadingPayment] = useState(false);

  dispatch(calculatetotal());

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setStep((prev) => prev - 1);
  };

  const updateUserAddress = async () => {
    try {
      await axios.post("http://localhost:5000/api/updatecustaddress", { CustomerId: userdata._id, Address: address })
      handleNextStep();
    } catch (error) {
      console.error(error);
      alert("Failed to update address.");
    }
  };

  const handlePayment = async () => {
    setLoadingPayment(true);

     // Load Razorpay script dynamically
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    setLoadingPayment(false);
    return;
  }

  const razorpay = await axios.post("http://localhost:5000/api/RazorpayOrder", { userId: userdata._id, amount: carttotal })

console.log(razorpay.data.order.id);
    const options = {
      key: 'rzp_test_DN13BsXBiCnLZy', 
      amount: carttotal * 100,
      currency: "INR",
      name: "Jayashree Delights",
      description: "Order Payment",
      order_id:razorpay.data.order.id,
      handler: async function (response) {
        alert("Payment Successful!");
        await finalizeOrder();
      },
      prefill: {
        name: userdata?.Name,
        email: userdata?.Email,
        contact: userdata?.Mobile,
      },
      theme: {
        color: "#ff5722",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoadingPayment(false);
  };

  const finalizeOrder = async () => {
    let finalItems = cart.map((item) => ({
      dishid: item._id,
      quantity: item.quantity,
    }));

    let orderReqData = {
      TotalAmount: carttotal,
      NoOfItems: cart.length,
      CustomerId: userdata._id,
      items: finalItems,
      address,
    };

    try {
      await createOrder(orderReqData, userdata.token);
      dispatch(clearCart());
      setShowModal(false);
      alert("Order Placed Successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Order placement failed!");
    }
  };

  return (
    <Container className="cart-section py-4 "style={{height:"100vh",paddingTop:"10vh"}}>
      <h3 className="text-center mb-4">🛒 Your Cart</h3>

      {cart.length === 0 ? (
        <h5 className="text-center text-muted">Your cart is empty.</h5>
      ) : (
        <>
          <Row className="justify-content-center">
            {cart.map((dish, index) => (
              <Col key={index} lg={3} md={4} sm={6} xs={12} className="mb-3">
                <Card className="cart-item-card small-card" style={{height:"58vh"}}>
                  <Card.Img variant="top" src={dish.Image} className="cart-img" style={{height:"30vh"}} />
                  <Card.Body className="text-center p-2">
                    <Card.Title className="small-title">{dish.DishName}</Card.Title>
                    <Card.Text className="fw-bold small-text">₹{dish.Price}</Card.Text>

                    <div className="d-flex justify-content-center align-items-center my-2">
                      <Button variant="secondary" className="qty-btn me-2" onClick={() => dispatch(decreaseqty(dish._id))}>
                        <FaMinus />
                      </Button>
                      <span className="fw-bold">{dish.quantity}</span>
                      <Button variant="secondary" className="qty-btn ms-2" onClick={() => dispatch(increaseqty(dish._id))}>
                        <FaPlus />
                      </Button>
                    </div>

                    <Button variant="danger" size="sm" className="w-100 remove-btn" onClick={() => dispatch(removeItem(dish._id))}>
                      <FaTrashAlt className="me-1" /> Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-3">
            <h4 className="fw-bold">Total: ₹{carttotal}</h4>
            <Button variant="primary" size="lg" className="mt-2" onClick={() => setShowModal(true)}>
              Place Order
            </Button>
          </div>
        </>
      )}

      {/* Stepper Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Process</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 && (
            <>
              <h5>📍 Delivery Address</h5>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control as="textarea" value={address} onChange={(e) => setAddress(e.target.value)} />
              </Form.Group>
              <Button variant="primary" onClick={updateUserAddress}>
                Save & Next
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <h5>💳 Payment</h5>
              <p>Total Amount: ₹{carttotal}</p>
              <Button variant="success" onClick={handlePayment} disabled={loadingPayment}>
                {loadingPayment ? "Processing..." : "Pay Now"}
              </Button>
              <Button variant="secondary" className="ms-2" onClick={handleBackStep}>
                Back
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <h5>🎉 Order Confirmed!</h5>
              <p>Your order has been placed successfully.</p>
              <Button variant="primary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Cart;
