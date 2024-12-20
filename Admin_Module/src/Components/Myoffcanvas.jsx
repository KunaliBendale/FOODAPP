// import React from 'react'
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import Nav from 'react-bootstrap/Nav';
// import { HiOutlineViewList } from "react-icons/hi";
// import { Link } from 'react-router-dom';

// const Myoffcanvas = () => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button  className='mt-3 ms-3' onClick={handleShow}>
//         <HiOutlineViewList/>
//       </Button>

//       <Offcanvas show={show} onHide={handleClose} onClick={handleClose} className="w-25">
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title style={{fontSize:'30px'}} >Food App</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//         <Nav className="d-flex flex-column " style={{color:'black'}}>
//             <Nav.Link href="#home"> <Link to={'/'}style={{color:'black',fontSize:"20px",textDecoration:'none'}}>Dashboard</Link> </Nav.Link>
//             <Nav.Link href="#link"><Link to={'/adddishes'} style={{color:'black',fontSize:"20px",textDecoration:'none'}}>Add Dishes</Link></Nav.Link>
//             <Nav.Link href="#link" > <Link to={'/alldishes'}style={{color:'black',fontSize:"20px",textDecoration:'none'}}>View All Dishes</Link></Nav.Link>
//             <Nav.Link href="#link"> <Link to={'/view_orders'}style={{color:'black',fontSize:"20px",textDecoration:'none'}}>View Orders</Link></Nav.Link>
//             <Nav.Link href="#link"> <Link to={'/reviews'} style={{color:'black',fontSize:"20px",textDecoration:'none'}}>Reviews</Link></Nav.Link>
//         </Nav>
//         </Offcanvas.Body>
//       </Offcanvas>


//       <>
//          <Navbar expand="lg" className="bg-body-tertiary">
//       <Container fluid>
//         <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//            <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//             >
//             <Nav.Link href="#action1">Home</Nav.Link>
//             <Nav.Link href="#action2">Link</Nav.Link>
            
//             <Nav.Link href="#" disabled>
//               Link
//             </Nav.Link>
//           </Nav>
//             <Button variant="outline-success">Search</Button>
          
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//     </>
//     </>
//   );
// }

// export default Myoffcanvas

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { AiOutlineBars } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Myoffcanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Navbar Component */}
      <Navbar expand="lg" className=" text-bg-primary">
        <Container fluid>
          <Button className="me-3" onClick={handleShow}>
            <AiOutlineBars />
          </Button>
          <Navbar.Brand href="/">Food App</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
          {/* <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <Nav.Link href="#" disabled>
                Disabled Link
              </Nav.Link>
            </Nav>
            <Button variant="outline-success">Search</Button>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>

      {/* Offcanvas Component */}
      <Offcanvas show={show} onHide={handleClose} placement="start" className="w-25">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontSize: '30px' }}>Food App</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="d-flex flex-column" style={{ color: 'black' }}>
            <Nav.Link>
              <Link to={'/'} style={{ color: 'black', fontSize: "20px", textDecoration: 'none' }}>Dashboard</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/adddishes'} style={{ color: 'black', fontSize: "20px", textDecoration: 'none' }}>Add Dishes</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/alldishes'} style={{ color: 'black', fontSize: "20px", textDecoration: 'none' }}>View All Dishes</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/view_orders'} style={{ color: 'black', fontSize: "20px", textDecoration: 'none' }}>View Orders</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/reviews'} style={{ color: 'black', fontSize: "20px", textDecoration: 'none' }}>Reviews</Link>
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Myoffcanvas;
