import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Delivered from './OrderTabs/Delivered';
import Cancelled from './OrderTabs/Cancelled';
import InTransit from './OrderTabs/InTransit';
import Pending from './OrderTabs/Pending';
import { Container, Card } from 'react-bootstrap';

const MyOrders = () => {
    const navigate = useNavigate();
    const { userdata } = useSelector((state) => state.user);
    
    return (
        <Container fluid className='' >
            <Card className='shadow-lg p-3 rounded' style={{height:"90vh"}}>
                <h3 className='text-center mb-3 fw-bold'>📦 My Orders</h3>
                <Tabs defaultActiveKey='Delivered' className='mb-3'>
                    <Tab eventKey='Delivered' title='✅ Delivered'>
                        <Delivered />
                    </Tab>
                    <Tab eventKey='Pending' title='⏳ Pending'>
                        <Pending />
                    </Tab>
                    <Tab eventKey='In Transit' title='🚚 In-Transit'>
                        <InTransit />
                    </Tab>
                    <Tab eventKey='Cancelled' title='❌ Cancelled'>
                        <Cancelled />
                    </Tab>
                </Tabs>
            </Card>
        </Container>
    );
};

export default MyOrders;
      {/* {
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
      } */}

   