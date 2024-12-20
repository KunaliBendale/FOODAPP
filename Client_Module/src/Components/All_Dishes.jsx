import { useState } from 'react';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addItem } from '../Reduxwork/Cartslice';
import { fetchDishes } from '../apicalls/dishApi.jsx';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

const All_Dishes = () => {
   const dispatch=useDispatch();
  const [cards, setCards] = useState([]);
   const navigate= useNavigate()
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetchDishes()
      console.log(response);
      setCards(response.data);
    }
    fetchdata();
  }, [])

  
  return (
    <div className="d-flex flex-wrap mt-2 ">
            {
                cards.map((dish)=>{
                    return (
                         <div className="card me-3 " style={{ width: '20%' }}>
                             <div className="Image-div card-header  "style={{height:'55%',cursor:'pointer'}} >
                                 <img src={dish.Image} width={200} onClick={()=>
                                    navigate('/dishdetails',{state:dish})
                                 }></img> 
                             </div>

                             <div className='card-body '>
                                 <h5>{dish.DishName}</h5>
                                 <p>Price : &#8377; {dish.Price} /-</p>
                                 <span>{dish.IsAvailable}</span>
                                 <div className='d-flex align-items-center '>
                                 <p >Ratings : <FaStar color='yellow'className='me-1'/>{dish.averageratings.toFixed(2)}</p>

                                    </div>
                             </div>

                            <div className='card-footer'>
                                <button className='btn btn-outline-primary w-100 mb-2' onClick={()=>{dispatch(addItem(dish,dish.quantity=1))}} > Add To Cart </button>
                                {/* <button className='btn btn-outline-danger w-100 '><MdDeleteForever /> Remove Item</button> */}
                            </div>
                        </div>
                      
                    )
                })
            }

        </div>
    )
}
export default All_Dishes