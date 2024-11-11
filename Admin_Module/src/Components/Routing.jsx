import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import All_Dishes from './All_Dishes'
import View_Orders from './View_Orders'
import Reviews from './Reviews'
import Myoffcanvas from './Myoffcanvas'
import AddDishes from './Add_Dishes'
import OrderDetails from './OrderDetails'


const Routing = () => {
  return (
    <div>
        <BrowserRouter>
        <Myoffcanvas/>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/add_dishes' element={<AddDishes/>}/>
            <Route path='/all_dishes' element={<All_Dishes/>}/>
            <Route path='/view_orders' element={<View_Orders/>}/>
            <Route path='/reviews' element={<Reviews/>}/>
            <Route path='/orderdetails' element={<OrderDetails/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
  
}

export default Routing