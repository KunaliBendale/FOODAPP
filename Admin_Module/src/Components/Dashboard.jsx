// import React, { useEffect, useState, PureComponent } from 'react'
// import { Container } from 'react-bootstrap'
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import axios from 'axios';

// import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const Dashboard = () => {

//   const [counter, setCounter] = useState(0)
//   const [revenue, setRevenueCounter] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const fetchCounters = async () => {
//       try {
//         // Fetch counter data
//         const counters = await axios.get("http://localhost:8080/api/countercollection");
//         setCounter(counters.data.data);
//         console.log(counters.data.data);

//         // Fetch revenue data
//         const revenueCounter = await axios.get("http://localhost:8080/api/totalrevenue");
//         setRevenueCounter(revenueCounter.data.data)
//         console.log("revenue", revenueCounter.data.data);

//         //fetch top 5 dishes
//         const fetchBarChartData = await axios.get("http://localhost:8080/api/getTopDishes");

//         const transformedData = fetchBarChartData.data.data.map((item) => ({
//           DishName: item.dishDetails?.DishName || "Unknown",
//           totalQuantity: item.totalQuantity,
//           totalRevenue: item.totalRevenue,
//         }));

//         setChartData(transformedData)
//         console.log(fetchBarChartData.data.data);

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchCounters();
//   }, []);
//   return (
//     <Container className='mt-3 '>
//       <>
//         <Row className='w-100  gap-5' style={{ height: "29vh" ,marginBottom:"8%"}}>
//           <Col className='w-25 border p-3'>
//             <h3 style={{ textAlign: "center" }}>Total Customers:</h3>
//             <h1 style={{ textAlign: "center" }} className='mt-4'>{counter.CustomerCounter}</h1>

//           </Col>
//           <Col className='w-25 border p-3'>
//             <h3 style={{ textAlign: "center" }}>Total Dishes:</h3>
//             <h1 style={{ textAlign: "center" }} className='mt-4'>{counter.DishCounter}</h1>

//           </Col>
//           <Col className='w-25 border p-3'>
//             <h3 style={{ textAlign: "center" }}>Total Orders:</h3>
//             <h1 style={{ textAlign: "center" }} className='mt-4'>{counter.OrderCounter}</h1>

//           </Col>
//           <Col className='w-25 border p-3'>
//             <h3 style={{ textAlign: "center" }}>Total Revenue: </h3>
//             <h1 style={{ textAlign: "center" }} className='mt-4'>
//               {revenue.map((price) => price.totalRevenue)}
//             </h1>
//           </Col>
//         </Row>
//       </>

//       <div style={{marginTop:"0px"}} >
//         <h4>Top 4 Dishes </h4>
//         <ResponsiveContainer width="50%" height={280}>
//           <BarChart
//             width={50}
//             height={300}
//             data={chartData}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >

//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="DishName" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="totalQuantity" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
//             <Bar dataKey="totalRevenue" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>


//     </Container>

//   )
// }

// export default Dashboard


import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import CountUp from "react-countup"; // Import CountUp Library
import { FaUsers, FaUtensils, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const Dashboard = () => {
  const [counter, setCounter] = useState({});
  const [revenue, setRevenueCounter] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const counters = await axios.get("http://localhost:5000/api/countercollection");
        setCounter(counters.data.data || {});

        const revenueCounter = await axios.get("http://localhost:5000/api/totalrevenue");
        setRevenueCounter(revenueCounter.data.data || []);

        const fetchBarChartData = await axios.get("http://localhost:5000/api/getTopDishes");
        const transformedData = fetchBarChartData.data.data.map((item) => ({
          DishName: item.dishDetails?.DishName || "Unknown",
          totalQuantity: item.totalQuantity,
          totalRevenue: item.totalRevenue,
        }));
        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounters();
  }, []);

  return (
    <Container fluid className="mt-4 px-4">
      {/* Row of 4 Cards */}
      <Row className="d-flex justify-content-between mb-4">
        {[
          { title: "Total Customers", value: counter.CustomerCounter, icon: <FaUsers size={30} /> },
          { title: "Total Dishes", value: counter.DishCounter, icon: <FaUtensils size={30} /> },
          { title: "Total Orders", value: counter.OrderCounter, icon: <FaShoppingCart size={30} /> },
          { title: "Total Revenue", value: revenue.length > 0 ? revenue[0].totalRevenue : 0, icon: <FaRupeeSign size={30} /> },
        ].map((item, index) => (
          <Col key={index} md={3} className="d-flex justify-content-center">
            <Card className="shadow-lg p-3 rounded text-center border-0 bg-light" style={{ width: "100%" }}>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  {item.icon}
                  <h5 className="text-muted">{item.title}</h5>
                </div>
                <h2 className="fw-bold text-primary mt-2">
                  <CountUp start={1} end={item.value || 0} duration={2.5} separator="," />
                </h2>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Section */}
      <Row className="pb-4">
        <Col md={6}>
          <h4 className="fw-bold mb-3">📊 Top 4 Dishes</h4>
          <div className="bg-light p-3 rounded shadow">
            <p className="text-center text-muted">Top Selling Dishes Analysis</p>
            <ResponsiveContainer width="90%" height={300}>
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="DishName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalQuantity" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="totalRevenue" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>

        {/* <Col md={6}>
          <h4 className="fw-bold mb-3">📈 Another Chart</h4>
          <div className="border rounded p-5 bg-light d-flex align-items-center justify-content-center" style={{ height: "300px" }}>
            <p className="text-muted">Chart Placeholder</p>
          </div>
        </Col> */}
      </Row>
    </Container>
  );
};

export default Dashboard;
