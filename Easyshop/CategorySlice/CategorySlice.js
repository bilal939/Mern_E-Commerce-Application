import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    categorydata : ''
}


const categoryreducer = createSlice({
    name:'category',
    initialState:initialstate,
    reducers:{
        addtocategory(state,action){
            state.categorydata = action.payload
        }
    }
})


export const {addtocategory} = categoryreducer.actions;


export default categoryreducer.reducer;
