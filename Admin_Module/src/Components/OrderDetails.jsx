import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Form, Image } from 'react-bootstrap'
import axios from 'axios'


const OrderDetails = () => {
    const [slectedStatus, setslectedStatus] = useState("")

    const data = useLocation().state
    console.log(data);

    let updateOrderStatus = async () => {
        try {
            let staussReqData = {
                orderid: data._id,
                OrderStatus: slectedStatus

            }
            let result = await axios.post("http://localhost:8080/api/updateorderstatus", staussReqData)
            console.log(result);
            alert("Stsus Updated")
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className='p-4 '>
            <div className='border ps-4' style={{ borderTopLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                <div className='p-3'>
                    <div> Order Id : {data._id}</div>
                    <div> Order Date : {data.OrderDate}</div>
                    <div className='btn btn-secondary rounded-pill mt-2'> {data.OrderStatus}</div>

                </div>
                <div className='d-flex justify-content-around mt-3 pt-2 border-top border-bottom'>
                    <div>
                        <h3>Customer Info</h3>
                        <p>Name : <>{data.CustomerId.Name}</></p>
                        <p>Email : <>{data.CustomerId.Email}</></p>
                        <p>Mobile : <>{data.CustomerId.Mobile}</></p>
                        <p > Address : {data.CustomerId.Address},{data.CustomerId.City},{data.CustomerId.State}</p>

                    </div>

                    <div>
                        <h3>Order Info</h3>
                        <p>Total Amount : <>{data.TotalAmount}</></p>
                        <p>No. Of Items : <>{data.NoOfItems}</></p>

                    </div>
                </div>

                <div className='mt-4 ps-3'>
                    <h5>Dishes</h5>
                    <div className=' border d-flex justify-content-evenly '>
                        {
                            data.items.map((item) => {
                                return (
                                    <div className='d-flex ' style={{ width: "100%", height: "30vh" }}>
                                        <div className=' p-3 w-50'>
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


