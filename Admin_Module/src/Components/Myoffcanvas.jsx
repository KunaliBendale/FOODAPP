import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { HiOutlineViewList } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Myoffcanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button  className='mt-3 ms-3' onClick={handleShow}>
        <HiOutlineViewList/>
      </Button>

      <Offcanvas show={show} onHide={handleClose} className="w-25">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontSize:'30px'}} >Food App</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Nav className="d-flex flex-column " style={{color:'black'}}>
            <Nav.Link href="#home"> <Link to={'/'}style={{color:'black',fontSize:"20px",textDecoration:'none'}}>Dashboard</Link> </Nav.Link>
            <Nav.Link href="#link"><Link to={'/add_dishes'} style={{color:'black',fontSize:"20px",textDecoration:'none'}}>Add Dishes</Link></Nav.Link>
            <Nav.Link href="#link" > <Link to={'/all_dishes'}style={{color:'black',fontSize:"20px",textDecoration:'none'}}>View All Dishes</Link></Nav.Link>
            <Nav.Link href="#link"> <Link to={'/view_orders'}style={{color:'black',fontSize:"20px",textDecoration:'none'}}>View Orders</Link></Nav.Link>
            <Nav.Link href="#link"> <Link to={'/reviews'} style={{color:'black',fontSize:"20px",textDecoration:'none'}}>Reviews</Link></Nav.Link>
        </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Myoffcanvas