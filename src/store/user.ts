import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface userInformationInterface {
    name: string,
    picture: string,
    wallet: number,
    inserted: number,
}

interface userStateInterface {
    userInformation: userInformationInterface | undefined,
    credential: string | undefined
}

const initialState: userStateInterface = {
    userInformation: undefined,
    credential: undefined
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, {payload}: PayloadAction<string | undefined>) => {
            if (payload === undefined) {
                // TODO: Add notification
                return state;
            }
            state.credential = payload;
        },
        logoutUser: (state) => {
            state.credential = undefined;
            state.userInformation = undefined;
        },
        changeUserInformation: (state, action: PayloadAction<userInformationInterface>) => {
            state.userInformation = action.payload;
        },
        insertCoin: (state, action: PayloadAction<number>) => {
            if (state.userInformation!.wallet >= action.payload) {
                state.userInformation!.wallet -= action.payload;
                state.userInformation!.inserted += action.payload;
            } else {
                // TODO: Add notification
                return state;
            }
        },
        setRemainingCoin: (state, action: PayloadAction<number>) => {
            state.userInformation!.inserted = action.payload;
        },
        refundCoin: (state) => {
            state.userInformation!.wallet += state.userInformation!.inserted;
            state.userInformation!.inserted = 0;
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;