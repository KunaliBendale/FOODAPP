// // import React from 'react'
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import Carousel from 'react-bootstrap/Carousel';
// // import './HomePage.css';

// // import {  Row, Col, Card } from "react-bootstrap";
// // import { FaUtensils, FaLeaf, FaStar, FaUsers } from "react-icons/fa";
// // import Topdishes from './Topdishes';
// // import AboutUs from './AboutUs';


// // const Homepage = () => {
// //     return (
// //         <div style={{ display: 'block', width: "100%" }}>

// //             <Carousel>
// //                 <Carousel.Item interval={3000} style={{ height: "80vh" }}>
// //                     <img
// //                         className="d-block w-100"
// //                         src="bg1.jpeg"
// //                         alt="Image One"
// //                     />
// //                     <Carousel.Caption className='carouselcaption ' >
// //                         <h1 style={{ fontSize: "40px" }}>Label for first slide</h1>
// //                         <p>Sample Text for Image One</p>
// //                     </Carousel.Caption>
// //                 </Carousel.Item>
// //                 <Carousel.Item interval={3000} style={{ height: "80vh" }}>
// //                     <img
// //                         className="d-block w-100 carouselimages"
// //                         src="photo-.jfif"
// //                         alt="Image Two"
// //                         style={{ backgroundPosition: "cover" }}
// //                     />
// //                     {/* <Carousel.Caption className='carouselcaption' >
// //                         <h3>Label for second slide</h3>
// //                         <p>Sample Text for Image Two</p>
// //                     </Carousel.Caption> */}
// //                 </Carousel.Item>

// //                 <Carousel.Item interval={2000} style={{ height: "80vh" }}>
// //                     <img
// //                         className="d-block w-100 carouselimages"
// //                         src="https://5.imimg.com/data5/PN/LT/GLADMIN-28409022/south-indian.jpg"
// //                         alt="Image Three"
// //                     />
// //                     <Carousel.Caption className='carouselcaption'>
// //                         <h1>Label for third slide</h1>
// //                         <p>Sample Text for Image Two</p>
// //                     </Carousel.Caption>
// //                 </Carousel.Item>
// //             </Carousel>

            
// //             <Topdishes/>
                    
// //             <AboutUs/>
// //         </div>
// //     )
// // }

// // export default Homepage


// import React from "react";
// import { Container } from "react-bootstrap";
// import Carousel from "react-bootstrap/Carousel";
// import Topdishes from "./Topdishes";
// import AboutUs from "./AboutUs";
// import "./HomePage.css";

// const Homepage = () => {
//   return (
//     <div className="homepage">
//       {/* Hero Section */}
//       <Carousel fade className="hero-carousel">
//         <Carousel.Item interval={3000}>
//           <img className="d-block w-100 hero-image" src="bg1.jpeg" alt="Delicious Food" />
//           <Carousel.Caption className="hero-caption">
//             <h1>Welcome to Gourmet Delights</h1>
//             <p>Experience the taste of luxury with our exquisite dishes.</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item interval={3000}>
//           <img className="d-block w-100 hero-image" src="photo-.jfif" alt="Fine Dining" />
//           <Carousel.Caption className="hero-caption">
//             <h1>Authentic Flavors, Perfected</h1>
//             <p>Bringing the world's best cuisines to your plate.</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item interval={3000}>
//           <img
//             className="d-block w-100 hero-image"
//             src="https://5.imimg.com/data5/PN/LT/GLADMIN-28409022/south-indian.jpg"
//             alt="Fusion Cuisine"
//           />
//           <Carousel.Caption className="hero-caption">
//             <h1>Unforgettable Dining Experience</h1>
//             <p>Enjoy food made with passion and perfection.</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//       </Carousel>

//       {/* Featured Dishes */}
//       <Container fluid className="mt-2 w-100">
//         <Topdishes />
//       </Container>

//       {/* About Us Section */}
//       <Container fluid >
//         <AboutUs />
//       </Container>
//     </div>
//   );
// };

// export default Homepage;


import React from "react";
import HeroSection from "./HeroSection";
import TopDishes from "./TopDishes";
import AboutUs from "./AboutUs";
import SpecialOffers from "./SpecialOffers";
import "./HomePage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <HeroSection />

      {/* Special Offers Banner */}
      <SpecialOffers />

      {/* Top Dishes - Full Width */}
      <div >
        <TopDishes />
      </div>

      {/* About Us - Full Width */}
      <div>
        <AboutUs />
      </div>
    </div>
  );
};

export default Homepage;

