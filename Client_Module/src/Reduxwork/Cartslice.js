import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart:[]
}

const Cartslice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem:(state,action)=>{
            alert("item added to cart");
            console.log(state.cart);
            state.cart=[...state.cart,action.payload]
            console.log(state.cart);
        }
    }
})

export const{addItem}=Cartslice.actions;

export default Cartslice.reducer;