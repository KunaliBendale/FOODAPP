import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Delivered from './OrderTabs/Delivered';
import Pending from './OrderTabs/Pending';
import Cancelled from './OrderTabs/Cancelled';
import InTransit from './OrderTabs/InTransit';


const View_Orders = () => {
  const navigate = useNavigate()
  const [ordercards, setordercards] = useState([])

  useEffect(() => {

    const fetchorders = async () => {
      const customerorders = await axios.get("http://localhost:8080/api/getorders")
      console.log(customerorders.data.data);
      setordercards(customerorders.data.data)
    }
    fetchorders();
  }, [])

  return (
    <div className='container-fluid'>
      {
        ordercards.map((order) => {
          return (
            <div className='container border border-dark p-3 mb-5 ' style={{ height: "25vh" }}>

              <div>
                <Tabs
                  defaultActiveKey="Delivered"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="Delivered" title="Delivered">
                   <Delivered/>
                  </Tab>
                  <Tab eventKey="Pending" title="Pending">
                    <Pending/>
                  </Tab>
                  <Tab eventKey="In-Transit" title="In-Transit" >
                    <InTransit/>
                  </Tab>

                  <Tab eventKey="Cancelled" title="Cancelled" >
                    <Cancelled/>
                  </Tab>
                </Tabs>


              </div>
              {/* <div className='ps-5'>
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
              </div> */}
            </div>
          )
        })
      }
    </div>


  )
}

export default View_Orders


