import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface coinStateInterface {
    total: number,
    inserted: number,
}

const initialState: coinStateInterface = {
    total: 100,
    inserted: 0,
}

const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        insertCoin: (state, action: PayloadAction<number>) => {
            console.log(state.total, state.inserted, action.payload);
            if (state.total >= action.payload) {
                state.total -= action.payload;
                state.inserted += action.payload;
            } else {
                // TODO: Add notification
                return state;
            }
        },
        refundCoin: (state) => {
            state.total += state.inserted;
            state.inserted = 0;
        }
    }
})

export const coinActions = coinSlice.actions;

export default coinSlice.reducer;