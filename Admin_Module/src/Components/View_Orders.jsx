// import React from 'react'
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import Delivered from './OrderTabs/Delivered';
// import Pending from './OrderTabs/Pending';
// import Cancelled from './OrderTabs/Cancelled';
// import InTransit from './OrderTabs/InTransit';


// const View_Orders = () => {
//   const navigate = useNavigate()
//   const [ordercards, setordercards] = useState([])

//   return (
//     <div className='container-fluid'>
//             <div className='container border border-dark p-3 mb-5 ' >

//               <div>
//                 <Tabs
//                   defaultActiveKey="Delivered"
//                   id="uncontrolled-tab-example"
//                   className="mb-3"
//                 >
//                   <Tab eventKey="Delivered" title="Delivered">
//                    <Delivered/>
//                   </Tab>
//                   <Tab eventKey="Pending" title="Pending">
//                     <Pending/>
//                   </Tab>
//                   <Tab eventKey="In-Transit" title="In-Transit" >
//                     <InTransit/>
//                   </Tab>

//                   <Tab eventKey="Cancelled" title="Cancelled" >
//                     <Cancelled/>
//                   </Tab>
//                 </Tabs>


//               </div>
//             </div>
//     </div>


//   )
// }

// export default View_Orders


import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Delivered from "./OrderTabs/Delivered";
import Pending from "./OrderTabs/Pending";
import Cancelled from "./OrderTabs/Cancelled";
import InTransit from "./OrderTabs/InTransit";

const View_Orders = () => {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" textAlign="center" mb={2}>
        Order Management
      </Typography>

      <Tabs 
        value={tabValue} 
        onChange={(e, newValue) => setTabValue(newValue)} 
        centered
      >
        <Tab label="Delivered" />
        <Tab label="Pending" />
        <Tab label="In-Transit" />
        <Tab label="Cancelled" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tabValue === 0 && <Delivered />}
        {tabValue === 1 && <Pending />}
        {tabValue === 2 && <InTransit />}
        {tabValue === 3 && <Cancelled />}
      </Box>
    </Box>
  );
};

export default View_Orders;

