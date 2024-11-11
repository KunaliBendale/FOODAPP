import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Delivered = () => {
    const { userdata } = useSelector((state) => state.user)
    const [order, setorders] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        const deliveredOrders = async () => {
            const orderdata = await axios.post("http://localhost:8080/api/getordersbycustidstatus", {
                OrderStatus: "Delivered",
                CustomerId: "userdata._id"
            })

            setorders(orderdata.data.data)
        }
        deliveredOrders();
    }, [])
  return (
    <div>
       {
        order.map((item) => {
          return (
            <div className='container border border-dark p-3 mb-5 ' style={{ height: "25vh" }}>
              <div className='ps-5'>
                <div className=' d-flex justify-content-evenly align-items-center'>
                  <div>
                    <p style={{ fontSize: "20px" }}> Status : {item.OrderStatus}</p>

                    <p style={{ fontSize: "20px" }}> Date : {item.OrderDate} </p>
                  </div>


                  <div>
                    <p style={{ fontSize: "20px" }}> Total Amount : {item.TotalAmount}</p>
                    <p style={{ fontSize: "20px" }}> Quantity : {item.NoOfItems}</p>
                  </div>

                  <div className='d-flex gap-2'>
                    <div>
                      <button onClick={() => navigate('/orderdetails', { state: item })} className='btn btn-success'>View Details</button>

                    </div>
                    <div>
                      <button className='btn btn-danger mb-2' onClick={() => { deleteOrder(item._id) }}>Delete Order</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Delivered