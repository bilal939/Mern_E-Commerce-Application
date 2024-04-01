import { configureStore } from "@reduxjs/toolkit";
import cartslice from "../cartslice/cartslice";
import userslice from "../userslice/userslice";
import CategorySlice from "../CategorySlice/CategorySlice";
const store = configureStore({
    reducer:{
        cart:cartslice,
        user:userslice,
        category:CategorySlice
    
    }
})

export default store;