import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Form, Image } from 'react-bootstrap'
import axios from 'axios'
import { updateStatus } from '../apicalls/orderApi'


const OrderDetails = () => {
    const [slectedStatus, setslectedStatus] = useState("")

    const data = useLocation().state
    console.log(data);

    let updateOrderStatus = async () => {
        try {
            let statusReqData = {
                orderid: data._id,
                OrderStatus: slectedStatus

            }
            let result = await updateStatus(statusReqData)
            console.log(result);
            alert("Status Updated")
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className='p-4 '>
            <div className='border ps-4' style={{ borderTopLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                <div className='p-3'>
                    <div> Order Id : {data._id}</div>
                    <div> Order Date : {data.formattedOrderDate}</div>
                    <div className='btn btn-secondary rounded-pill mt-2'> {data.OrderStatus}</div>

                </div>
                <div className='d-flex flex-row mt-3 pt-2 border-top border-bottom'>
                    <div className='d-flex  justify-content-center'>
                        <div>
                        <h3>Customer Info</h3>
                            <p > Name : {data.CustomerDetails.Name}</p>
                            <p > Email : {data.CustomerDetails.Email}</p>
                            <p > Mobile : {data.CustomerDetails.Mobile}</p>
                            <p > Address : {data.CustomerDetails.Address} ({data.CustomerDetails.Pincode}) ,{data.CustomerDetails.City} ,
                                 {data.CustomerDetails.State}</p>


                        </div>

                        <div>
                            <h3>Order Info</h3>

                            <p>Total Amount : <>{data.TotalAmount}</></p>
                            <p>No. Of Items : <>{data.NoOfItems}</></p>

                        </div>
                    </div>
                </div>

                <div className='mt-4 ps-3'>
                    <h5>Dishes</h5>
                    <div className=' border d-flex justify-content-evenly '>
                        {
                            data.DishDetails.map((item) => {
                                return (
                                    <div className='d-flex ' style={{ width: "100%", height: "30vh" }}>
                                        <div className=' p-3 w-50'>
                                            <Image src={item.Image} style={{ height: '25vh', width: "100%", objectFit: "contain" }} rounded />
                                        </div>

                                        <div className='border-right ps-2 pt-2 w-50'>
                                            <h4> Dish Info. </h4>
                                            <p style={{ fontSize: "15px" }}> Dish Name : {item.DishName}</p>
                                            <p style={{ fontSize: "15px" }}> Dish Category : {item.Category}</p>
                                            <p style={{ fontSize: "15px" }}> Dish type : {item.DishType}</p>

                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    {/* <div>
                        {data.items.map((item) => {
                            return (
                                <div>
                                    <p style={{ fontSize: "15px" }}> Quantity : {item.quantity}</p>

                                </div>
                            )
                        })}
                    </div> */}
                </div>
            </div>

            <div>

                <h3>Update Status</h3>
                <Form.Check type='radio' label="Preparing"
                    value="Preparing"
                    name='status'
                    onChange={(e) => setslectedStatus(e.target.value)} />

                <Form.Check type='radio'
                    label="In Transmit"
                    value="In Transmit"
                    onChange={(e) => setslectedStatus(e.target.value)}
                    name='status' />

                <Form.Check type='radio'
                    label="Delivered"
                    value="Delivered"
                    onChange={(e) => setslectedStatus(e.target.value)}
                    name='status' />

                <Form.Check type='radio'
                    label="Cancel"
                    value="Cancelled"
                    onChange={(e) => setslectedStatus(e.target.value)}
                    name='status' />

                <Button onClick={() => updateOrderStatus()}>Update Status</Button>
            </div>

        </div>
    )
}
export default OrderDetails
