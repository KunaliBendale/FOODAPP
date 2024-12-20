import React, { useEffect, useState, PureComponent } from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {

  const [counter, setCounter] = useState(0)
  const [revenue, setRevenueCounter] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        // Fetch counter data
        const counters = await axios.get("http://localhost:8080/api/countercollection");
        setCounter(counters.data.data);
        console.log(counters.data.data);

        // Fetch revenue data
        const revenueCounter = await axios.get("http://localhost:8080/api/totalrevenue");
        setRevenueCounter(revenueCounter.data.data)
        console.log("revenue", revenueCounter.data.data);

        //fetch top 5 dishes
        const fetchBarChartData = await axios.get("http://localhost:8080/api/getTopDishes");

        const transformedData = fetchBarChartData.data.data.map((item) => ({
          DishName: item.dishDetails?.DishName || "Unknown",
          totalQuantity: item.totalQuantity,
          totalRevenue: item.totalRevenue,
        }));

        setChartData(transformedData)
        console.log(fetchBarChartData.data.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounters();
  }, []);
  return (
    <Container className='mt-3 '>
      <>
        <Row className='w-100  gap-5' style={{ height: "29vh" ,marginBottom:"8%"}}>
          <Col className='w-25 border p-3'>
            <h3 style={{ textAlign: "center" }}>Total Customers:</h3>
            <h1 style={{ textAlign: "center" }} className='mt-4'>{counter.CustomerCounter}</h1>

          </Col>
          <Col className='w-25 border p-3'>
            <h3 style={{ textAlign: "center" }}>Total Dishes:</h3>
            <h1 style={{ textAlign: "center" }} className='mt-4'>{counter.DishCounter}</h1>

          </Col>
          <Col className='w-25 border p-3'>
            <h3 style={{ textAlign: "center" }}>Total Orders:</h3>
            <h1 style={{ textAlign: "center" }} className='mt-4'>{counter.OrderCounter}</h1>

          </Col>
          <Col className='w-25 border p-3'>
            <h3 style={{ textAlign: "center" }}>Total Revenue: </h3>
            <h1 style={{ textAlign: "center" }} className='mt-4'>
              {revenue.map((price) => price.totalRevenue)}
            </h1>
          </Col>
        </Row>
      </>

      <div style={{marginTop:"0px"}} >
        <h4>Top 4 Dishes </h4>
        <ResponsiveContainer width="50%" height={280}>
          <BarChart
            width={50}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >

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


    </Container>

  )
}

export default Dashboard