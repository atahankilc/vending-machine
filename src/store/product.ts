import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import productInterface from "../interfaces/product";

interface productStateInterface {
    list: productInterface[],
    requestFetch: boolean
}

const initialState: productStateInterface = {
    list: [],
    requestFetch: false
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        changeProductList: (state, action: PayloadAction<productInterface[]>) => {
            state.requestFetch = false;
            state.list = action.payload;
        },
        requestFetch: (state) => {
            state.requestFetch = true;
        }
    }
})

export const productActions = productSlice.actions;

export default productSlice.reducer;