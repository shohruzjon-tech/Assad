import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../services/firebase';

const initialState ={
    isLoading: false,
    error: null,
    isFulfilled: false,
};

export const updateOrder = createAsyncThunk('orders/put', async (order)=>{
    return setDoc(doc(db, "orders-list", order?.order_id), order, {merge: true});
});

export const updateSlice = createSlice({
    name: 'put/orders',
    initialState,
    extraReducers:{
        [updateOrder.pending]: (state, action) => {
            state.isLoading=true;
        },
        [updateOrder.fulfilled]: (state, action) => {
            state.isLoading=false;
            state.isFulfilled=true;
        },
        [updateOrder.rejected]:(state, action) => {
            state.error='Malumotni yuklashda hatolik yuz berdi. Iltimos keyinroq urinib kuring!';
            state.isLoading=false;
        } 
    }
});

export default  updateSlice.reducer;