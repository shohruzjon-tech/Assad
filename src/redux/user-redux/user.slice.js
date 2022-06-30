import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: undefined,
};


export const userSlice = createSlice({
    name: 'user/auth-slice',
    initialState,
    reducers: {
         setUser(state, { payload }){
             state.user=payload;
         },
    },
});

export const { setUser } = userSlice.actions;

export default  userSlice.reducer;