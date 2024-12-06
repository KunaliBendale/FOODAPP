import React from 'react'
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
            console.log(review);
            await axios.post("http://localhost:8080/api/addreview", review)

            handleClose();

        } catch (error) {
            console.log(error);
        }
    }


    return (
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
    )
}

export default DishDetails