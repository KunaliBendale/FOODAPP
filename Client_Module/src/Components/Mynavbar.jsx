import { Button } from 'bootstrap';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Mynavbar = () => {
  return (
    <div>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container >
          <Navbar.Brand href="#home">Food App </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="gap-5">
              <Nav.Link href="#home"> <Link to={'/'} style={{ listStyle: 'none', textDecoration: 'none' }}>Home</Link></Nav.Link>
              <Nav.Link href="#all-dishes"> <Link to={'/all_dishes'} style={{ listStyle: 'none', textDecoration: 'none' }}>All Dishes</Link></Nav.Link>
              <Nav.Link href="#my-orders"> <Link to={'/my_orders'} style={{ listStyle: 'none', textDecoration: 'none' }}>My Orders</Link></Nav.Link>
              <Nav.Link href="#my-cart"> <Link to={'/cart'} style={{ listStyle: 'none', textDecoration: 'none' }}>Cart</Link></Nav.Link>
              <Nav.Link href="#my profile"> <Link to={'/profile'} style={{ listStyle: 'none', textDecoration: 'none' }}>My Profile</Link></Nav.Link>
              <div>
                <button className="btn btn-outline-secondary me-4"><Link to={'/login'} style={{ listStyle: 'none', textDecoration: 'none' }}>Login/SignUp </Link></button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default Mynavbar