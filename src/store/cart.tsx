import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import cartInterface from "../interfaces/cart";
import productInterface from "../interfaces/product";

export interface cartStateInterface {
    dict: cartInterface;
    totalCount: number;
    totalPrice: number;
}

const initialState: cartStateInterface = {
    dict: {},
    totalCount: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<productInterface>) => {
            if (state.dict[action.payload.id]) {
                state.dict[action.payload.id].count++;
                state.totalPrice += action.payload.price;
                state.totalCount++;
            } else {
                state.dict[action.payload.id] = {
                    name: action.payload.name,
                    price: action.payload.price,
                    count: 1
                };
                state.totalPrice += action.payload.price;
                state.totalCount++;
            }
        },
        removeFromCart: (state, action: PayloadAction<productInterface>) => {
            if (state.dict[action.payload.id] === undefined) {
                return;
            } else if (state.dict[action.payload.id].count > 1) {
                state.dict[action.payload.id].count--;
                state.totalPrice -= action.payload.price;
                state.totalCount--;
            } else {
                delete state.dict[action.payload.id];
                state.totalPrice -= action.payload.price;
                state.totalCount--;
            }
        },
        deleteCart: () => {
            return {...initialState};
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;