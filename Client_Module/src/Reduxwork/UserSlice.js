import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userdata: {},
    register: false,
    login: false,
    customerId: null
}

const UserSlice = createSlice({
    name: "userdata",
    initialState,
    reducers: {

        isLogin: (state, action) => {

            if (state.userdata.Name == action.payload.Name && state.userdata.Password == action.payload.Password) {
                state.login = true;
                alert("login is successful")
            } else {
                alert("incorrect username or password")
            }
        },

        
        isRegister: (state, action) => {
            state.userdata = action.payload
            state.register = true
        }
    }

})


export const { isLogin, isRegister } = UserSlice.actions;

export default UserSlice.reducer;