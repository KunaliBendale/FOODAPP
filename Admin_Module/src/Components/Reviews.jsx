// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Rating,
//   Chip,
// } from "@mui/material";
// import Slider from "react-slick"; // For smooth horizontal scrolling
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Reviews = () => {
//   const [review, setReview] = useState([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const reviews = await axios.get("http://localhost:8080/api/getaverageRating");
//         console.log(reviews.data.data);
//         setReview(reviews.data.data);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };
//     fetchReviews();
//   }, []);

//   // Slider settings for horizontal scrolling
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3, // Show 3 reviews at a time
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2 } },
//       { breakpoint: 768, settings: { slidesToShow: 1 } },
//     ],
//   };

//   return (
//     <Box sx={{ maxWidth: "90%", margin: "auto", py: 4 }}>
//       <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom align="center">
//         Dish Reviews 🍽️
//       </Typography>

//       {review.length > 0 ? (
//         <Slider {...settings}>
//           {review.map((item, index) => (
//             <Card
//               key={index}
//               sx={{
//                 maxWidth: 350,
//                 mx: 2,
//                 borderRadius: 4,
//                 boxShadow: 5,
//                 transition: "transform 0.3s",
//                 "&:hover": { transform: "scale(1.05)" },
//                 position: "relative",
//                 textAlign: "center",
//                 p: 2,
//               }}
//             >
//               {/* Floating Review Count */}
//               <Chip
//                 label={`${item.averageratings.toFixed(1)} ★`}
//                 color="secondary"
//                 sx={{
//                   position: "absolute",
//                   top: 10,
//                   right: 10,
//                   fontWeight: "bold",
//                 }}
//               />

//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={item._id.Image}
//                 alt={item._id.DishName}
//                 sx={{
//                   borderRadius: "50%",
//                   width: 120,
//                   height: 120,
//                   objectFit: "cover",
//                   margin: "auto",
//                   border: "5px solid #f5f5f5",
//                   boxShadow: 3,
//                 }}
//               />

//               <CardContent>
//                 <Typography variant="h6" fontWeight="bold">
//                   {item._id.DishName}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {item._id.DishType} | ₹{item._id.Price}
//                 </Typography>

//                 <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
//                   <Rating value={item.averageratings} precision={0.5} readOnly />
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//         </Slider>
//       ) : (
//         <Typography variant="h6" color="textSecondary" sx={{ textAlign: "center", mt: 4 }}>
//           No reviews available
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default Reviews;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Image } from "react-bootstrap";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getaverageRating");
        setReviews(response.data.data);
        
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Dish Reviews</h2>
     
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Dish Name</th>
            <th>Type</th>
            <th>Price (₹)</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
        {console.log(reviews)}
          {reviews.map((item, index) => (
            
            <tr key={index}>
              <td>
                <Image
                  src={item._id.Image}
                  alt={item._id.DishName}
                  width={50}
                  height={50}
                  rounded
                />
              </td>
              <td>{item._id.DishName}</td>
              <td>{item._id.DishType}</td>
              <td>{item._id.Price}</td>
              <td>{item.averageratings.toFixed(1)} ⭐</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Reviews;


