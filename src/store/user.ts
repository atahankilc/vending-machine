import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface userInformationInterface {
    name: string,
    picture: string,
    wallet: number,
    inserted: number
}

interface userStateInterface {
    userInformation: userInformationInterface | undefined,
    credential: string | undefined,
    isSupplier: boolean
}

const initialState: userStateInterface = {
    userInformation: undefined,
    credential: undefined,
    isSupplier: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, {payload}: PayloadAction<string | undefined>) => {
            if (payload === undefined) {
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
        returnCoin: (state, action: PayloadAction<number>) => {
            state.userInformation!.wallet = state.userInformation!.wallet + action.payload;
            state.userInformation!.inserted = 0;
        },
        enterToSupplierMode: (state) => {
            state.isSupplier = true;
        },
        exitFromSupplierMode: (state) => {
            state.isSupplier = false;
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;