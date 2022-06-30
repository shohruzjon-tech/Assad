import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../services/firebase';

const initialState ={
    isLoading: false,
    error: null,
    products: [],
};

export const getProducts = createAsyncThunk('products/get', async ()=>{
    return getDocs(collection(db, "products"));
});

export const productSlice = createSlice({
    name: 'products/get/all',
    initialState,
    extraReducers:{
        [getProducts.pending]: (state, action) => {
            state.isLoading=true;
        },
        [getProducts.fulfilled]: (state, { payload }) => {
            state.isLoading=false;
            const array = [];
            payload.forEach(doc=>{
                const data = doc.data()
                array.push(data);
            });
            state.products=array;
        },
        [getProducts.rejected]:(state, action) => {
            state.error='Malumotni yuklashda hatolik yuz berdi. Iltimos keyinroq urinib kuring!';
            state.isLoading=false;
        } 
    }
});



export default  productSlice.reducer;