import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

const DishDetails = () => {
    const data = useLocation().state
    const [dishReview,setDishReview]=useState([]);

    useEffect(()=>{
        const fetchdata= async()=>{
            const result= await axios.post("http://localhost:8080/api/getreviewbydishid" , {DishId:data._id} )
            
            const reviews = result.data.data;
            // Sort reviews by Rating in descending order
            const sortedReviews = reviews.sort((a, b) => {
                return b.Rating - a.Rating; // If dates are the same, sort by rating (highest first)

            })
            
            setDishReview(sortedReviews)
           console.log(result.data.data);
        }
        fetchdata();
    }, []);

    return (
        <div>
            <div>
                {data._id}
                <h3>Dish Name : {data.DishName}</h3>
                <h3>Dish Price :{data.Price}</h3>

            </div>

           <div>
          
           {
                dishReview.map((review) => {

                    return (

                        <>
                            <h3>{review.CustomerId.Name}</h3>
                            <p>{review.DishId._id}</p>
                            <p>{review.DishId.DishName}</p>
                            <p>{review.Rating}</p>
                        </>
                    )

                })
            }
           </div>

        </div>
    )
}

export default DishDetails