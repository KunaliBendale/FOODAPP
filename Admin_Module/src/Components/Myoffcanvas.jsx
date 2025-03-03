
// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
// import { AiOutlineBars } from "react-icons/ai";
// import { Link } from 'react-router-dom';

// const Myoffcanvas = () => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       {/* Navbar Component */}
//       <Navbar expand="lg" className=" text-bg-primary">
//         <Container fluid>
//           <Button className="me-3" onClick={handleShow}>
//             <AiOutlineBars />
//           </Button>
//           <Navbar.Brand href="/">Food App</Navbar.Brand>
//           {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
//           {/* <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="me-auto my-2 my-lg-0"
//               style={{ maxHeight: '100px' }}
//               navbarScroll
//             >
//               <Nav.Link href="#action1">Home</Nav.Link>
//               <Nav.Link href="#action2">Link</Nav.Link>
//               <Nav.Link href="#" disabled>
//                 Disabled Link
//               </Nav.Link>
//             </Nav>
//             <Button variant="outline-success">Search</Button>
//           </Navbar.Collapse> */}
//         </Container>
//       </Navbar>

//       {/* Offcanvas Component */}
//       <Offcanvas show={show} onHide={handleClose} placement="start" className="w-25">
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title style={{ fontSize: '30px' }}>Food App</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <Nav className="d-flex flex-column" style={{ color: 'black' }}>
//             <Nav.Link>
//               <Link to={'/'} style={{ color: 'black', fontSize: "20px", textDecoration: 'none' }}>Dashboard</Link>
//             </Nav.Link>
//             <Nav.Link>
//               <Link to={'/adddishes'} style={{ color: 'black', fontSize: "20px", textDecoration: 'none' }}>Add Dishes</Link>
//             </Nav.Link>
//             <Nav.Link>
//               <Link to={'/alldishes'} style={{ color: 'black', fontSize: "20px", textDecoration: 'none' }}>View All Dishes</Link>
//             </Nav.Link>
//             <Nav.Link>
//               <Link to={'/view_orders'} style={{ color: 'black', fontSize: "20px", textDecoration: 'none' }}>View Orders</Link>
//             </Nav.Link>
//             <Nav.Link>
//               <Link to={'/reviews'} style={{ color: 'black', fontSize: "20px", textDecoration: 'none' }}>Reviews</Link>
//             </Nav.Link>
//           </Nav>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// }
// export default Myoffcanvas;



import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { AiOutlineBars } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaUtensils, FaClipboardList, FaBoxOpen, FaStar, FaPlusCircle } from "react-icons/fa"; 

const Myoffcanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* 🔹 Admin Navbar */}
      <Navbar expand="lg" className="text-bg-dark shadow-sm">
        <Container fluid className="d-flex align-items-center">
          <Button variant="light" className="me-3 shadow-sm" onClick={handleShow}>
            <AiOutlineBars size={20} />
          </Button>
          <Navbar.Brand className="text-white fw-bold fs-4">🍽️ Food App Admin</Navbar.Brand>
        </Container>
      </Navbar>

      {/* 🔹 Offcanvas Sidebar */}
      <Offcanvas show={show} onHide={handleClose} placement="start" className=" shadow" style={{width:"20%"}}>
        <Offcanvas.Header closeButton className="bg-dark text-white">
          <Offcanvas.Title className="fw-bold fs-4">Admin Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-3 bg-light" onClick={handleClose}>
          <Nav className="d-flex flex-column gap-3">
            <Nav.Link as={Link} to="/" className="nav-item text-dark fs-5 d-flex align-items-center">
              <FaClipboardList className="me-2" /> Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/adddishes" className="nav-item text-dark fs-5 d-flex align-items-center">
              <FaPlusCircle className="me-2" /> Add Dishes
            </Nav.Link>
            <Nav.Link as={Link} to="/alldishes" className="nav-item text-dark fs-5 d-flex align-items-center">
              <FaUtensils className="me-2" /> View All Dishes
            </Nav.Link>
            <Nav.Link as={Link} to="/view_orders" className="nav-item text-dark fs-5 d-flex align-items-center">
              <FaBoxOpen className="me-2" /> View Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/reviews" className="nav-item text-dark fs-5 d-flex align-items-center">
              <FaStar className="me-2" /> Reviews
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Myoffcanvas;
