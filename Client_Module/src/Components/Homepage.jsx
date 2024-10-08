import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

const Homepage = () => {
    return (
        <div style={{ display: 'block', width: "100%" }}>

            <Carousel>
                <Carousel.Item interval={5000} className='vh-100'>
                    <img
                        className="d-block w-100"
                        src="background1.jpg"
                        alt="Image One"
                    />
                    <Carousel.Caption className='carouselcaption'>
                        <h3>Label for first slide</h3>
                        <p>Sample Text for Image One</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100 carouselimages"
                        src="../assets/images/background1.jpg"
                        alt="Image Two"
                    />
                    <Carousel.Caption className='carouselcaption'>
                        <h3>Label for second slide</h3>
                        <p>Sample Text for Image Two</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100 carouselimages"
                        src="../assets/images/background1.jpg"
                        alt="Image Three"
                    />
                    <Carousel.Caption className='carouselcaption'>
                        <h3>Label for third slide</h3>
                        <p>Sample Text for Image Two</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Homepage