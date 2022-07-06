import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: undefined,
};


export const statSlice = createSlice({
    name: 'admin/get-statistics',
    initialState,
    reducers: {
         setAdmin(state, { payload }){
             state.admin=payload;
         },
    },
});

export const { setAdmin } = statSlice.actions;

export default  statSlice.reducer;