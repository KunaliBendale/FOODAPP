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
        },

        increaseqty:(state,action)=>{
            const newitem = state.cart.find((item) => item._id === action.payload)
            newitem.quantity += 1;
        },
        decreaseqty:(state,action)=>{
        
            const newitem = state.cart.find((item) => item._id === action.payload)
            if (newitem.quantity <= 1) {
                state.cart = state.cart.filter(item => item._id !== action.payload)
            } else {
                newitem.quantity -= 1;

            }
        },
        removeItem:(state,action)=>{
           state.cart = state.cart.filter(item=> item._id !== action.payload)
           console.log(state.cart);
        }
    }
})


export const{addItem,increaseqty,decreaseqty,removeItem}=Cartslice.actions;

export default Cartslice.reducer;