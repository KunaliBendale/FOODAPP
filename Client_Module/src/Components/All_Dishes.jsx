import { useState } from 'react';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addItem } from '../Reduxwork/Cartslice';

const All_Dishes = () => {
   const dispatch=useDispatch();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("http://localhost:8080/api/getdishes")
      console.log(response.data.data);
      
      setCards(response.data.data);
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
                                 <img src={dish.Image} width={200}></img>
                             </div>

                             <div className='card-body '>
                                 <h5>{dish.DishName}</h5>
                                 <p>Price : &#8377; {dish.Price} /-</p>
                                 <span>{dish.IsAvailable}</span>

                             </div>

                            <div className='card-footer'>
                               
                                <button className='btn btn-outline-primary w-100 mb-2' onClick={()=>{dispatch(addItem(dish,dish.quantity=1))}} >Add To Cart</button>
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