import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Rating } from '@smastrom/react-rating';
import { useSelector } from 'react-redux';
import axios from "axios";

const DishDetails = () => {
    const data = useLocation().state

    const { userdata } = useSelector((state) => state.user)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const [custReviews, setCustReviews] = useState([])
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
            }

            await axios.post("http://localhost:8080/api/addreview", review)

            handleClose();

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchdata = async () => {
            const result = await axios.post("http://localhost:8080/api/getreviewbydishid", { DishId: data._id })

            const reviews = result.data.data;
            // Sort reviews by Rating in descending order
            const sortedReviews = reviews.sort((a, b) => {
                return b.Rating - a.Rating; // If dates are the same, sort by rating (highest first)

            })

            setCustReviews(sortedReviews)
            console.log(result.data.data);
        }
        fetchdata();
    }, []);

    return (
        <div>
            <div>
                <h3>Dish Name : {data.DishName}</h3>
                <h3>Dish Price :{data.Price}</h3>

                <button onClick={handleShow}>Add Rating</button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Rating</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />

                        Comment: <textarea rows={4} cols={50} onChange={(e) => { setComment(e.target.value) }}>

                        </textarea>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => { addRating(), handleClose }} >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                {
                    custReviews.map((review) => {

                        return (

                            <>

                                <h3>{review.CustomerId.Name}</h3>
                                <p>{review.DishId._id}</p>

                                <p>{review.Comment}</p>
                                <p>{review.Rating}</p>
                                <p>{review.ReviewDate}</p>
                            </>
                        )

                    })
                }
            </div>


        </div>
    )
}

export default DishDetails