import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, Button, Row, Container } from 'react-bootstrap'
import "./TopDishes.css";
import { addItem } from '../Reduxwork/Cartslice';
import { useDispatch } from 'react-redux';

const Topdishes = () => {
    const [dishes, setDishes] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchdata = async () => {
            const getdata = await axios.get("http://localhost:5000/api/gettopdishes")
            console.log(getdata.data.data);
            setDishes(getdata.data.data)
        }
        fetchdata();
    }, [])
    return (
        <Container fluid className="top-dishes-section">

            <div className="glassmorphism-container" >
                <h2 className="text-center mb-4">🔥Our Top 5 Dishes</h2>
                <Row  >
                    {
                        dishes.map((dish) => {
                            return (
                                <Col >
                                    <Card className="shadow-lg border-0 rounded hover-effect">
                                        <Card.Img
                                            variant="top"
                                            src={dish.dishDetails.Image}

                                            className="rounded-top"
                                            style={{ height: "200px", objectFit: "cover", }}
                                        />

                                        <Card.Body >
                                            <Card.Title className="fw-bold">{dish.dishDetails.DishName}</Card.Title>
                                            <Card.Subtitle className="text-muted">{dish.dishDetails.Category} - {dish.dishDetails.DishType}</Card.Subtitle>
                                            <Card.Text className="mt-2">
                                                <strong>Price:</strong> ₹{dish.dishDetails.Price}
                                            </Card.Text>
                                            <div className="d-flex justify-content-center">
                                                <Button
                                                    variant={dish.dishDetails.IsAvailable ? "success" : "danger"}
                                                    disabled={!dish.dishDetails.IsAvailable} onClick={() => dispatch(addItem(dish.dishDetails, dish.dishDetails.quantity = 1))}>
                                                    {dish.dishDetails.IsAvailable ? "Add To Cart" : "Out of Stock"}
                                                </Button>
                                            </div>
                                        </Card.Body>

                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </Container >
    )
}

export default Topdishes