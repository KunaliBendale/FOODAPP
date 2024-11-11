import React from 'react'
import { useLocation } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import axios from 'axios'

const OrderDetails = () => {
    const data = useLocation().state
    console.log(data);

    
    return (

        <div className='p-4 d-flex justify-content-center'>
            <div className='border ps-4 w-75' style={{ borderTopLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                <div>
                    <div className='p-3'>
                    <div> Order Id : {data._id}</div>
                    <div> Order Date : {data.OrderDate}</div>
                    <div className='btn btn-secondary rounded-pill mt-2'> {data.OrderStatus}</div>
                </div>

                <div className='d-flex justify-content-around mt-3 pt-2 border-top border-bottom'>
                    
                    <div>
                        <h3>Order Info</h3>
                        <p>Total Amount : <>{data.TotalAmount}</></p>
                        <p>No. Of Items : <>{data.NoOfItems}</></p>

                    </div>
                </div>

                <div className='mt-4 ps-3 mb-4'>
                    <h5>Dishes</h5>
                    <div className=' border d-flex justify-content-evenly '>
                        {
                            data.items.map((item) => {
                                return (
                                    <div className='d-flex ' style={{ width: "100%", height: "30vh" }}>
                                        <div className='  w-50'>
                                            <Image src={item.dishid.Image} style={{ height: '30vh', width: "100%", objectFit: "contain" }} rounded />
                                        </div>  

                                        <div className='border-right ps-2 pt-2 w-50'>
                                            <h4> Dish Info. </h4>
                                            <p style={{ fontSize: "15px" }}> Dish Name : {item.dishid.DishName}</p>
                                            <p style={{ fontSize: "15px" }}> Dish Category : {item.dishid.Category}</p>
                                            <p style={{ fontSize: "15px" }}> Dish type : {item.dishid.DishType}</p>
                                            <p style={{ fontSize: "15px" }}> Quantity : {item.quantity}</p>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                
                </div>
            </div>
        </div>
    )
}


export default OrderDetails


 