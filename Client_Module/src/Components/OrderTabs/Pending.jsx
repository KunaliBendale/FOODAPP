// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { deletedOrder, fetchOrdersByStatus } from '../../apicalls/ordersApi.jsx'
// import { format } from "date-fns"
// const Delivered = () => {
//   const { userdata } = useSelector((state) => state.user)
//   const [order, setorder] = useState([])
//   const navigate = useNavigate()

//   useEffect(() => {
//     const deliveredOrders = async () => {
//       const orderdata = await fetchOrdersByStatus(
//         {
//           OrderStatus: "Delivered",
//           CustomerId: userdata._id
//         }, userdata.token
//       )
//       console.log(userdata._id);

//       const orders = orderdata.data;

//       //sort orders as newest first
//       const sortedOrders = orders.sort((a,b)=>{
//         return new Date(b.OrderDate) - new Date(a.OrderDate);
//       })

//        console.log(sortedOrders);
//       setorder(sortedOrders);
      
//     }
//     deliveredOrders();
//   }, [])

//   let deleteOrder = async (OrderId) => {
//     try {
//       const result = await deletedOrder(OrderId)
//       console.log(result);
//       setorder(order.filter((order) => order.OrderId !== OrderId))
//       alert("order deleted")
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div>
//       {
//         order.map((item) => {
//           return (
//             <div className='container border border-dark p-3 mb-5 ' style={{ height: "25vh" }}>
//               <div className='ps-5'>
//                 <div className=' d-flex justify-content-evenly align-items-center'>
//                   <div>
//                     <p style={{ fontSize: "20px" }}> Status : {item.OrderStatus}</p>


//                     <p style={{ fontSize: "20px" }}>  <p style={{ fontSize: '20px' }}>
//                       Date:{' '}
//                       {item.OrderDate
//                         ? format(new Date(item.OrderDate), 'yyyy-MM-dd')
//                         : 'N/A'}
//                     </p></p>
//                   </div>


//                   <div>
//                     <p style={{ fontSize: "20px" }}> Total Amount : {item.TotalAmount}</p>
//                     <p style={{ fontSize: "20px" }}> Quantity : {item.NoOfItems}</p>
//                   </div>

//                   <div className='d-flex gap-2'>
//                     <div>
//                       <button onClick={() => navigate('/orderdetails', { state: item })} className='btn btn-success'>View Details</button>

//                     </div>
//                     <div>
//                       <button className='btn btn-danger mb-2' onClick={() => { deleteOrder(item._id) }}>Delete Order</button>
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             </div>
//           )
//         })
//       }
//     </div>
//   )
// }

// export default Delivered



import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrdersByStatus, deletedOrder } from '../../apicalls/ordersApi';
import { format } from 'date-fns';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';

const Pending = () => {
    const { userdata } = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
 console.log("orders",orders);
    useEffect(() => {
        const fetchDeliveredOrders = async () => {
            const response = await fetchOrdersByStatus({ OrderStatus: 'Pending', CustomerId: userdata._id }, userdata.token);
            setOrders(response.data.sort((a, b) => new Date(b.OrderDate) - new Date(a.OrderDate)));
        };
        fetchDeliveredOrders();
    }, [userdata]);

    const handleDelete = async (orderId) => {
        try {
            await deletedOrder(orderId);
            setOrders(orders.filter((order) => order._id !== orderId));
            alert('Order deleted successfully');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            {orders.length === 0 ? (
                <p className='text-center text-muted'>No delivered orders yet.</p>
            ) : (
                orders.map((order) => (
                    <Card key={order._id} className='mb-3 p-3 shadow-sm'>
                        <Row className='align-items-center'>
                            <Col md={6}>
                                <h5>Order ID: {order._id}</h5>
                                <p>Date: {format(new Date(order.OrderDate), 'yyyy-MM-dd')}</p>
                                <Badge bg='success'>{order.OrderStatus}</Badge>
                            </Col>
                            <Col md={3}>
                                <h6>Amount: ₹{order.TotalAmount}</h6>
                                <p>Items: {order.NoOfItems}</p>
                            </Col>
                            <Col md={3} className='text-end'>
                                <Button variant='primary' className='me-2' onClick={() => navigate('/orderdetails', { state: order })}>
                                    View Details
                                </Button>
                                <Button variant='danger' onClick={() => handleDelete(order._id)}>Delete</Button>
                            </Col>
                        </Row>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default Pending;