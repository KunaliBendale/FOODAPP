import React from "react";
import Carousel from "react-bootstrap/Carousel";
import './HomePage.css'

const HeroSection = () => {
  return (
    <div className="hero-container">
      <Carousel fade className="hero-carousel">
        <Carousel.Item interval={3000}>
          <div className="parallax-bg" style={{ backgroundImage: "url(bg1.jpeg)" }}></div>
          <Carousel.Caption className="hero-caption">
            <h1>Welcome to Jayashree Delights !</h1>
            <p>Experience the taste of luxury with our exquisite dishes.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <div className="parallax-bg" style={{ backgroundImage: "url(photo-.jfif)" }}></div>
          <Carousel.Caption className="hero-caption">
            <h1>Authentic Flavors, Perfected</h1>
            <p>Bringing the best food to your plate.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroSection;
