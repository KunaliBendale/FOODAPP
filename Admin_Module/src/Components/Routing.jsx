import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import All_Dishes from './All_Dishes'
import View_Orders from './View_Orders'
import Reviews from './Reviews'
import Myoffcanvas from './Myoffcanvas'
import AddDishes from './Add_Dishes'
import OrderDetails from './OrderDetails'
import DishDetails from './DishDetails'

const Routing = () => {
  return (
    <div>
      
        <BrowserRouter>
        <Myoffcanvas/>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/adddishes' element={<AddDishes/>}/>
            <Route path='/alldishes' element={<All_Dishes/>}/>
            <Route path='/view_orders' element={<View_Orders/>}/>
            <Route path='/reviews' element={<Reviews/>}/>
            <Route path='/orderdetails' element={<OrderDetails/>}/>
            <Route path='/dishdetails' element={<DishDetails/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
  
}

export default Routing