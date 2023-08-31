import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import productInterface from "../interfaces/product";

interface productStateInterface {
    list: productInterface[],
    requestFetch: boolean,
    updateProductFlag: boolean
}

const initialState: productStateInterface = {
    list: [],
    requestFetch: false,
    updateProductFlag: false
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
        },
        updateProduct: (state, action: PayloadAction<productInterface>) => {
            state.list = state.list.map((product) => {
                if (product.id === action.payload.id) {
                    return action.payload;
                } else {
                    return product;
                }
            })
            state.updateProductFlag = false;
        },
        requestProductUpdate: (state) => {
            state.updateProductFlag = true;
        }
    }
})

export const productActions = productSlice.actions;

export default productSlice.reducer;