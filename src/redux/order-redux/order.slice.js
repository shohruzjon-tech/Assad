import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../services/firebase';

const initialState ={
    isLoading: false,
    error: null,
    isFulfilled: false,
};

export const postOrder = createAsyncThunk('orders/post', async (order)=>{
    return setDoc(doc(db, "orders-list", order?.order_id), order);
});

export const ordersSlice = createSlice({
    name: 'post/orders',
    initialState,
    reducers:{
        clearStatus: (state) => {
              state.isFulfilled=false;
          },
    },
    extraReducers:{
        [postOrder.pending]: (state, action) => {
            state.isLoading=true;
        },
        [postOrder.fulfilled]: (state, action) => {
            state.isLoading=false;
            state.isFulfilled=true;
        },
        [postOrder.rejected]:(state, action) => {
            state.error='Malumotni yuklashda hatolik yuz berdi. Iltimos keyinroq urinib kuring!';
            state.isLoading=false;
        } 
    }
});

export const { clearStatus } = ordersSlice.actions;

export default  ordersSlice.reducer;