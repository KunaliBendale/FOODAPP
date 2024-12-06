import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { deletedOrder, fetchOrdersByStatus } from '../../apicalls/ordersApi'


const Cancelled = () => {
  const { userdata } = useSelector((state) => state.user)
  const [order, setorder] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const cancelledOrders = async () => {
      const orderdata = await fetchOrdersByStatus(
        {
          OrderStatus: "Cancelled",
          CustomerId: userdata._id
        }
      )

      setorder(orderdata.data)
    }
    cancelledOrders();
  }, [])

  let deleteOrder = async (OrderId) => {
    try {
      const result = await deletedOrder(OrderId)
      console.log(result);
      setorder(order.filter((order) => order.OrderId !== OrderId))
      alert("order deleted")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {
        order.map((order) => {
          return (
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
                  <div>
                    <button onClick={() => navigate('/orderdetails', { state: order })} className='btn btn-success'>View Details</button>

                  </div>
                  <div>
                    <button className='btn btn-danger mb-2' onClick={() => { deleteOrder(order._id) }}>Delete Order</button>
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

export default Cancelled