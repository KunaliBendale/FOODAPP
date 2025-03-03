import React from 'react';
import { useLocation } from 'react-router-dom';
import { Image, Container, Card, Row, Col, Badge } from 'react-bootstrap';
import './CSS/OrderDetails.css'
import { useNavigate } from 'react-router-dom';
const OrderDetails = () => {
    const data = useLocation().state;
    console.log(data);

    const navigate = useNavigate();

    return (
        <Container className="order-details-section py-4">
            <Card className="order-card mx-auto p-4">
                {/* Order Header */}
                <div className="text-center mb-3">
                    <h4 className="fw-bold">🛒 Order Details</h4>
                    <p className="text-muted">Order ID: {data._id}</p>
                    <Badge bg="secondary" className="rounded-pill px-3 py-2">{data.OrderStatus}</Badge>
                </div>

                {/* Order Summary */}
                <Row className="order-summary py-3 px-4 border-top border-bottom">
                    <Col md={6} className="border-end">
                        <h5 className="fw-bold">Order Information</h5>
                        <p><strong>Order Date:</strong> {new Date(data.OrderDate).toLocaleDateString()}</p>
                        <p><strong>Total Amount:</strong> ₹{data.TotalAmount}</p>
                        <p><strong>No. of Items:</strong> {data.NoOfItems}</p>
                    </Col>
                    <Col md={6}>
                        <h5 className="fw-bold">Customer Details</h5>
                        <p><strong>Name:</strong> {data.CustomerId.Name}</p>
                        <p><strong>Contact:</strong> {data.CustomerId.Mobile}</p>
                    </Col>
                </Row>

                {/* Dishes Section */}
                <div className="mt-4 px-4">
                    <h5 className="fw-bold">🍽️ Ordered Dishes</h5>
                    <Row className="g-3">
                        {data.items.map((item, index) => (
                           
                            <Col md={6} key={index}>
                                <Card className="dish-card p-2">
                                    <Row>
                                        <Col xs={7}>
                                            <Image src={item.dishid.Image} className="dish-img" cursor="pointer" rounded onClick={() => navigate('/dishdetails', { state: item.dishid })} />
                                        </Col>
                                        <Col xs={5} className="d-flex flex-column justify-content-center">
                                            <h6 className="fw-bold">{item.dishid.DishName}</h6>
                                            <p className="text-muted small mb-1">Category: {item.dishid.Category}</p>
                                            <p className="text-muted small mb-1">Type: {item.dishid.DishType}</p>
                                            <p className="fw-bold">Qty: {item.quantity}</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Card>
        </Container>
    );
};

export default OrderDetails;
