import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

const MyFooter = () => {
  return (
    <footer className="footer ">
      <Container>
        <Row className="justify-content-between align-items-center">
          {/* About Section */}
          <Col md={6} sm={12} className="footer-section">
            <h4>🍽️ Jayashree Delights</h4>
            <p className="footer-text">
              Savor the finest flavors, crafted by master chefs with passion and perfection.
              A journey of taste that leaves an unforgettable experience.
            </p>
          </Col>

          {/* Contact Section */}
          <Col md={5} sm={12} className="footer-section">
            <h4>📍 Contact Us</h4>
            <p className="footer-text"><FaMapMarkerAlt /> 123 Food Street, Jalgaon City, India</p>
            <p className="footer-text"><FaPhoneAlt /> +91 98765 43210</p>
            <p className="footer-text"><FaEnvelope /> support@jayashreedelights.com</p>
          </Col>
        </Row>

        {/* Separator Line */}
        <hr className="footer-divider" />

        {/* Social Media */}
        <Row>
          <Col className="text-center">
            <a href="https://www.facebook.com/" target="_blank" className="social-icon"><FaFacebook /></a>
            <a href="https://www.instagram.com/" className="social-icon"><FaInstagram /></a>
            <a href="https://x.com/twitter?lang=en" className="social-icon"><FaTwitter /></a>
          </Col>
        </Row>

        {/* Copyright */}
        <Row>
          <Col className="text-center">
            <p className="copyright">© 2025 Jayashree Delights. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
