import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./product";
import userReducer from "./user";
import cartReducer from "./cart";

const store = configureStore({
    reducer: {
        productReducer,
        userReducer,
        cartReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;