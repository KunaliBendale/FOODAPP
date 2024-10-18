import { configureStore } from "@reduxjs/toolkit";
import cartreducer from "./Cartslice";
import userReducer from "./UserSlice";
const Mainstore = configureStore({
    reducer: {
        cart: cartreducer,
        user: userReducer
    }
})


export default Mainstore