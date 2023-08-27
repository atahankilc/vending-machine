import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import productInterface from "../interfaces/product";

export interface productStateInterface {
    list: productInterface[];
}

const initialState: productStateInterface = {
    list: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<productInterface>) => {
            state.list.unshift(action.payload);
        },
        removeProduct: (state, action: PayloadAction<productInterface>) => {
            state.list = state.list.filter((product) => product.id !== action.payload.id)
        },
        changeProductList: (state, action: PayloadAction<productInterface[]>) => {
            state.list = action.payload;
        }
    }
})

export const productActions = productSlice.actions;

export default productSlice.reducer;