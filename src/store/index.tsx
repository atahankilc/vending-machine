import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./product";
import cartReducer from "./cart";

const store = configureStore({
    reducer: {
        productReducer,
        cartReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;