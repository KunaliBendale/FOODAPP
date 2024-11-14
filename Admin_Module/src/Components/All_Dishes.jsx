import { useState } from 'react';
import React, { useEffect } from 'react'
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { deleteOneDish, fetchDishData, updatePrice } from '../apicalls/dishApi';

const All_Dishes = () => {
    const [cards, setCards] = useState([]);
    const [show, setShow] = useState(false);

    const [selecteddish, setselecteddish] = useState(null);
    const [newprice, setnewprice] = useState('');

    const handleClose = () => {
        setselecteddish(null);
        setnewprice('');
        setShow(false)
    };

    const handleShow = (dish) => {
        setselecteddish(dish);
        setnewprice(dish.Price);
        setShow(true)
    };

    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetchDishData();
            setCards(response.data);
        }

        fetchdata();
    }, []);

    let updateDishPrice = async () => {
        try {
            let priceReqData = {

                dishid: selecteddish._id,
                Price: newprice
            }

            let result = await updatePrice(priceReqData)
            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    let deleteDish = async (DishId) => {
        try {
            let result = await deleteOneDish(DishId)
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="d-flex flex-wrap mt-2 ">
                {
                    cards.map((dish) => {
                        return (
                            <div className="card me-3 " style={{ width: '20%' }}>
                                <div className="Image-div card-header " style={{ height: '55%', cursor: 'pointer' }} >
                                    <img src={dish.Image} width={200}></img>
                                </div>

                                <div className='card-body '>
                                    <h5>{dish.DishName}</h5>
                                    <p>Price : &#8377; {dish.Price} /-</p>
                                    <span>{dish.IsAvailable}</span>
                                </div>


                                <div className='card-footer'>
                                    <button className='btn btn-outline-warning ' onClick={() => { deleteDish(dish._id) }}> Delete Dish </button>
                                    <button className='btn btn-outline-primary ' onClick={() => { handleShow(dish) }}> Update Price </button>

                                </div>
                            </div>
                        )
                    })
                }
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update DishPrice {selecteddish?.DishName} </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {selecteddish && (
                        <div>
                            <Form.Group className="mb-3">
                                <Form.Label>Current Price:</Form.Label>
                                <Form.Control type="text" value={selecteddish.Price} readOnly />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>New Price:</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={newprice}
                                    onChange={(e) => setnewprice(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateDishPrice}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default All_Dishes