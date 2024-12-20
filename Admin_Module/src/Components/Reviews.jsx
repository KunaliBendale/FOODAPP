import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Reviews = () => {
  const [review, setReview] = useState([])
  useEffect(() => {
    const fetchreviews = async () => {
      const reviews = await axios.get("http://localhost:8080/api/getaverageRating");
      console.log(reviews.data.data);
      setReview(reviews.data.data)
    }
    fetchreviews();
  }, []
  )
  return (
    <>
      <div className='d-flex'>
        {
          review.map((item) => {
            return (
              <div className='d-flex flex-column' >
                <img src={item._id.Image} style={{width:"50px",height:"50px"}}></img>
                <p>{item._id.DishName}</p>
                <p>{item._id.DishType}</p>
                <p>{item._id.Price}</p>
                <p>{item.averageratings}</p>
              </div>

            )
          })
        }
      </div>
    </>
  )
}

export default Reviews