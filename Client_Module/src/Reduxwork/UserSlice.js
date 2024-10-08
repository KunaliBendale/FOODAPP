import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userdata:{},
    register:false,
    login:false
}


const UserSlice=createSlice({
    name:"userdata",
    initialState,
    reducers:{

        isLogin:(state,action)=>{
            if(state.userdata.name==action.payload.name && state.userdata.password==action.payload.password){
                state.login=true;
                alert("login is successful")
            }else{
                alert("incorrect username or password")
            }

        },


        isRegister:(state,action)=>{
            state.userdata=action.payload
            state.register=true
        }
    }
    
})


export const {isLogin,isRegister}=UserSlice.actions;

export default UserSlice.reducer;