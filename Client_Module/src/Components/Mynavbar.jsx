import React, { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isLogout } from "../Reduxwork/UserSlice";
import "./Mynavbar.css"; // Ensure CSS is updated

const Mynavbar = () => {
  const { userdata } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isLoggedIn = userdata && Object.keys(userdata).length > 0;

  const [expanded, setExpanded] = useState(false); // Track menu state

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      className="custom-navbar"
      sticky="top"
    >
      <Container>
        <Navbar.Brand className="navbar-brand">🍽️Jayashree Delights</Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        />

        {/* Collapsible Menu */}
        <Navbar.Collapse id="basic-navbar-nav" className="nav-collapse">
          <Nav className="ms-auto nav-links">
            <Nav.Link as={Link} to="/" className="nav-item" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/all_dishes" className="nav-item" onClick={() => setExpanded(false)}>All Dishes</Nav.Link>
            <Nav.Link as={Link} to="/my_orders" className="nav-item" onClick={() => setExpanded(false)}>My Orders</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="nav-item" onClick={() => setExpanded(false)}>Cart</Nav.Link>
            <Nav.Link as={Link} to="/profile" className="nav-item" onClick={() => setExpanded(false)}>My Profile</Nav.Link>
          </Nav>

          {/* Logout/Login Button */}
          <div className="logout-container">
            {isLoggedIn ? (
              <Button
                variant="outline-danger"
                className="logout-btn"
                onClick={() => {
                  dispatch(isLogout());
                  setExpanded(false);
                }}
              >
                🚪 Logout
              </Button>
            ) : (
              <Button variant="outline-light" className="login-btn">
                <Link to="/login" className="login-link" onClick={() => setExpanded(false)}>Login/Sign Up</Link>
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Mynavbar;
