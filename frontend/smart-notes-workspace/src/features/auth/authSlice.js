import { createSlice } from "@reduxjs/toolkit";

const initState = {
    token: null,
    isLoggedIn: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers:{
        login:(state, action)=>{
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout:(state, action)=>{
            state.token = null;
            state.isLoggedIn = false;  
        }
    }
});


export const {login, logout} = authSlice.actions;

export default authSlice.reducer;

