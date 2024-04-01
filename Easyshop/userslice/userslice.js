import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-test-renderer";

const inititalstate = {
    userdata:'',
    isAuthenticated:false
}

const userslice = createSlice({
    name:'user',
    initialState:inititalstate,
    reducers:{
        adduserdata(state,action){
            console.log("data",action.payload)
            state.userdata = action.payload,
            isAuthenticated=true
        },
        logoutuser(state){
            state.userdata = '',
            isAuthenticated = false;
        }
    }
})


export const {adduserdata,logoutuser} = userslice.actions;


export default userslice.reducer;