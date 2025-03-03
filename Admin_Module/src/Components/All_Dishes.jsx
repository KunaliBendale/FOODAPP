// import { useState } from 'react';
// import React, { useEffect } from 'react'
// import axios from "axios";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { deleteOneDish, fetchDishData, updatePrice } from '../apicalls/dishApi';
// import { useNavigate } from 'react-router-dom';
// import { Col, Container, Row } from 'react-bootstrap';

// const All_Dishes = () => {
//     const [cards, setCards] = useState([]);
//     const [show, setShow] = useState(false);

//     const [selecteddish, setselecteddish] = useState(null);
//     const [newprice, setnewprice] = useState('');

//     const navigate = useNavigate();

//     const handleClose = () => {
//         setselecteddish(null);
//         setnewprice('');
//         setShow(false)
//     };

//     const handleShow = (dish) => {
//         setselecteddish(dish);
//         setnewprice(dish.Price);
//         setShow(true)
//     };

//     useEffect(() => {
//         const fetchdata = async () => {
//             const response = await fetchDishData();
//             setCards(response.data);

//         }

//         fetchdata();
//     }, []);

//     let updateDishPrice = async () => {
//         try {
//             let priceReqData = {

//                 dishid: selecteddish._id,
//                 Price: newprice
//             }

//             let result = await updatePrice(priceReqData)
//             console.log(result);

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     let deleteDish = async (DishId) => {
//         try {
//             let result = await deleteOneDish(DishId)
//             console.log(result);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <>
//             <div className="d-flex flex-wrap mt-2 ">
//                 {
//                     cards.map((dish) => {
//                         return (
//                             <div className="card me-3 " style={{ width: '20%' }}>
//                                 <div className="Image-div card-header " style={{ height: '55%', cursor: 'pointer' }} >
//                                     <img src={dish.Image} width={200} onClick={() =>
//                                         navigate('/dishdetails', { state: dish })
//                                     }></img>
//                                 </div>

//                                 <div className='card-body '>
//                                     <h5>{dish.DishName}</h5>
//                                     <p>Price : &#8377; {dish.Price} /-</p>
//                                     <span>{dish.IsAvailable}</span>
//                                 </div>


//                                 <div className='card-footer'>
//                                     <button className='btn btn-outline-warning ' onClick={() => { deleteDish(dish._id) }}> Delete Dish </button>
//                                     <button className='btn btn-outline-primary ' onClick={() => { handleShow(dish) }}> Update Price </button>

//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//             </div>

//             {/* <Container>
//                <>
//                {
//                cards.map((dish) => {
//                     <Row>
//                         <Col>
//                             <Card>
//                             <Card.Img variant="top" src={dish.Image} />
//                             <Card.Body>
//                             <Card.Title>{dish.DishName}</Card.Title>
//                             <Card.Text>
//                             This is a wider card with supporting text below as a natural lead-in to additional content. This
//                             content is a little bit longer.
//                             </Card.Text>
//                             <Button variant="primary">Go somewhere</Button>
//                             </Card.Body>
//                             </Card>
//                         </Col>

//                         <Col>

//                         </Col>
//                     </Row>
//                     }       
//                 }
//                </>

//             </Container> */}



//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Update DishPrice {selecteddish?.DishName} </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>

//                     {selecteddish && (
//                         <div>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Current Price:</Form.Label>
//                                 <Form.Control type="text" value={selecteddish.Price} readOnly />
//                             </Form.Group>

//                             <Form.Group className="mb-3">
//                                 <Form.Label>New Price:</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     value={newprice}
//                                     onChange={(e) => setnewprice(e.target.value)}
//                                 />
//                             </Form.Group>
//                         </div>
//                     )}

//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={updateDishPrice}>
//                         Save Changes
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     )
// }

// export default All_Dishes


import React, { useState, useEffect } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { deleteOneDish, fetchDishData, updatePrice } from "../apicalls/dishApi";
import { useNavigate } from "react-router-dom";

const All_Dishes = () => {
  const [dishes, setDishes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await fetchDishData();
      setDishes(response.data);
    } catch (error) {
      console.log("Error fetching dishes:", error);
    }
  };

  const handleOpen = (dish) => {
    setSelectedDish(dish);
    setNewPrice(dish.Price);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedDish(null);
    setNewPrice("");
    setOpen(false);
  };

  const updateDishPrice = async () => {
    try {
      await updatePrice({ dishid: selectedDish._id, Price: newPrice });
      fetchDishes();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDish = async (DishId) => {
    try {
      await deleteOneDish(DishId);
      fetchDishes();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "Image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Dish"
          style={{ width: "60px", height: "40px", cursor: "pointer", borderRadius: "5px" }}
          onClick={() => navigate("/dishdetails", { state: params.row })}
        />
      ),
    },
    { field: "DishName", headerName: "Dish Name", width: 180 },
    { field: "Category", headerName: "Category", width: 150 },
    { field: "Price", headerName: "Price (₹)", width: 120 },
    {
      field: "IsAvailable",
      headerName: "Available",
      width: 130,
      renderCell: (params) => (params.value ? "✅ Yes" : "❌ No"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button variant="contained" color="warning" size="small" onClick={() => handleOpen(params.row)} sx={{ mr: 1 }}>
            Edit
          </Button>
          <Button variant="contained" color="error" size="small" onClick={() => deleteDish(params.row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const rows = dishes.map((dish, index) => ({
    id: dish._id,
    Image: dish.Image,
    DishName: dish.DishName,
    Category: dish.Category,
    Price: dish.Price,
    IsAvailable: dish.IsAvailable,
  }));

  return (
    <Box sx={{ height: 500, width: "100%", p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
        🍽️ All Dishes 
      </Typography>
      <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick autoHeight />

      {/* Modal for Updating Price */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, width: 350 }}>
          <Typography variant="h6" id="modal-title" gutterBottom>
            Update Price - {selectedDish?.DishName}
          </Typography>
          <TextField fullWidth label="New Price" type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} sx={{ mb: 2 }} />
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={updateDishPrice}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default All_Dishes;
