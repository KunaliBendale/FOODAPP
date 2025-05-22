import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal, Card, Container, Row, Col, Form } from 'react-bootstrap';
import { Rating } from '@smastrom/react-rating';
import { useSelector } from 'react-redux';
import axios from "axios";
import './CSS/DishDetails.css'
const DishDetails = () => {
    const data = useLocation().state;
    console.log("data",data);
    const { userdata } = useSelector((state) => state.user);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [custReviews, setCustReviews] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addRating = async () => {
        try {
            const review = {
                Rating: rating,
                Comment: comment,
                DishId: data._id,
                CustomerId: userdata._id
            };

            await axios.post("http://localhost:5000/api/addreview", review);
            fetchReviews(); // Refresh reviews after adding a new one
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchReviews = async () => {
        try {
            const result = await axios.post("http://localhost:5000/api/getreviewbydishid", { DishId: data._id });
            const sortedReviews = result.data.data.sort((a, b) => b.Rating - a.Rating);
            setCustReviews(sortedReviews);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <Container className="py-4">
            <Row className="dish-details-card mx-auto">
                {/* Dish Image */}
                <Col md={5}>
                    <Card.Img variant="top" src={data.Image} className="dish-img" />
                </Col>

                {/* Dish Information */}
                <Col md={7}>
                    <Card className="p-4">
                        <h3 className="fw-bold">{data.DishName}</h3>
                        <h4 className="text-primary">₹{data.Price}</h4>
                        <p><strong>Category:</strong> {data.Category}</p>
                        <p><strong>Dish Type:</strong> {data.DishType}</p>
                        <Button variant="primary" onClick={handleShow} className="mt-2">⭐ Add Rating</Button>
                    </Card>
                </Col>
            </Row>

            {/* Rating Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Rate This Dish</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
                    </div>
                    <Form.Group className="mt-3">
                        <Form.Label>Leave a comment:</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e) => setComment(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={addRating}>Submit</Button>
                </Modal.Footer>
            </Modal>

            {/* Reviews Section */}
            {/* <div className="mt-4">
                <h4 className="fw-bold">Customer Reviews</h4>
                <Row className="g-3">
                    {custReviews.length > 0 ? custReviews.map((review, index) => (
                        <Col md={6} key={index}>
                            <Card className="p-3 review-card">
                                <h6 className="fw-bold">{review.CustomerId.Name}</h6>
                                <Rating readOnly value={review.Rating} style={{ maxWidth: 100 }} />
                                <p className="text-muted small">{new Date(review.ReviewDate).toLocaleDateString()}</p>
                                <p>{review.Comment}</p>
                            </Card>
                        </Col>
                    )) : <p className="text-muted">No reviews yet. Be the first to review!</p>}
                </Row>
            </div> */}
        </Container>
    );
};

export default DishDetails;
