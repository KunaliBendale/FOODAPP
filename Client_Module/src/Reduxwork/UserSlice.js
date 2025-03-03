import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userdata: {},
    register: false,
    login: false,
    customerId: null,
    logout:false
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        isLogin: (state, action) => {
            state.userdata = action.payload
            state.login = true

        },

        isRegister: (state, action) => {
            state.userdata = action.payload
            state.register = true
        },
        isLogout: (state) => {
            state.userdata = {}
            state.logout=true
            alert("logged out") 
        }
        
    }

})


export const { isLogin, isRegister,isLogout } = UserSlice.actions;

export default UserSlice.reducer;