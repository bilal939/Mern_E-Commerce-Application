import { createSlice } from "@reduxjs/toolkit";


const initiallstate = {
    cartitem:[]
}

const cartreducer = createSlice({
    name:'cart',
    initialState:initiallstate,
    reducers:{
        addtocart(state,action){
            state.cartitem.push(action.payload)
        },
        ClearCart(state){
            state.cartitem = []
        },
        deleteFromCart(state,action){
           state.cartitem = state.cartitem.filter((item) => item.name !== action.payload.name)
        }
    }
})


export const { addtocart , ClearCart , deleteFromCart } = cartreducer.actions;

export default cartreducer.reducer;