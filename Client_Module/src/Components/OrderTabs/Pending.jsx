import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Pending = () => {
    const { userdata } = useSelector((state) => state.user)
    const [orders, setorders] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        const pendingOrders = async () => {
            const orderdata = await axios.post("http://localhost:8080/api/getordersbycustidstatus", {
                OrderStatus: "Pending",
                CustomerId: "userdata._id"
            })

            setorders(orderdata.data.data)
        }
        pendingOrders();
    }, [])
  return (
    <div>
         {
                orders.map((order)=>{
                    return(
                        <div className='ps-5'>
                        <div className=' d-flex justify-content-evenly align-items-center'>
                          <div>
                            <p style={{ fontSize: "20px" }}> Name :{order.CustomerId.Name} </p>
                            <p style={{ fontSize: "20px" }}> Date : {order.OrderDate} </p>
                          </div>
        
                          <div>
                            <p style={{ fontSize: "20px" }}> Status : {order.OrderStatus}</p>
                            <p style={{ fontSize: "20px" }}> Total Amount : {order.TotalAmount}</p>
                          </div>
        
                          <div>
                            <button onClick={() => navigate('/orderdetails', { state: order })} className='btn btn-success'>View Details</button>
                          </div>
        
                        </div>
                      </div>
                    )
                })
            }
    </div>
  )
}

export default Pending