import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./product";
import coinReducer from "./coin";
import cartReducer from "./cart";

const store = configureStore({
    reducer: {
        productReducer,
        coinReducer,
        cartReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;