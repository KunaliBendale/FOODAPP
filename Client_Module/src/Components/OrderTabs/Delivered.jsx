import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { deletedOrder, fetchOrdersByStatus } from '../../apicalls/ordersApi.jsx'
import { format } from "date-fns"
const Delivered = () => {
  const { userdata } = useSelector((state) => state.user)
  const [order, setorder] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const deliveredOrders = async () => {
      const orderdata = await fetchOrdersByStatus(
        {
          OrderStatus: "Delivered",
          CustomerId: userdata._id
        }, userdata.token
      )
      console.log(userdata._id);

      const orders = orderdata.data;

      //sort orders as newest first
      const sortedOrders = orders.sort((a,b)=>{
        return new Date(b.OrderDate) - new Date(a.OrderDate);
      })

       console.log(sortedOrders);
      setorder(sortedOrders);
      
    }
    deliveredOrders();
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
        order.map((item) => {
          return (
            <div className='container border border-dark p-3 mb-5 ' style={{ height: "25vh" }}>
              <div className='ps-5'>
                <div className=' d-flex justify-content-evenly align-items-center'>
                  <div>
                    <p style={{ fontSize: "20px" }}> Status : {item.OrderStatus}</p>


                    <p style={{ fontSize: "20px" }}>  <p style={{ fontSize: '20px' }}>
                      Date:{' '}
                      {item.OrderDate
                        ? format(new Date(item.OrderDate), 'yyyy-MM-dd')
                        : 'N/A'}
                    </p></p>
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