import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Homepage from './Homepage';
import All_Dishes from './All_Dishes';
import My_Orders from './My_Orders';
import Cart from './Cart';
import MyProfile from './MyProfile';
import Login_Page from './Login_Page';
import Mynavbar from './Mynavbar';
import Signuppage from './signuppage';


const Routing = () => {
  return (
    <div>
        <BrowserRouter>
            <Mynavbar/>
            <Routes>
                <Route path='/' element={<Homepage/>}/>
                <Route path='/all_dishes' element={<All_Dishes/>}/>
                <Route path='/my_orders' element={<My_Orders/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/profile' element={<MyProfile/>}/>
                <Route path='/login' element={<Login_Page/>}/>
                <Route path='/signup' element={<Signuppage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Routing