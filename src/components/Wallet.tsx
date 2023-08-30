import {useSelector} from "react-redux";
import WalletIcon from "@mui/icons-material/Wallet";
import {RootState} from "../store";
import {IconButton, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import React from "react";

const Wallet = () => {

    const walletBalance = useSelector((state: RootState) => state.userReducer.userInformation!.wallet);

    const addMoneyHandler = () => {

    }

    return (
        <div className={"wallet"}>
            <WalletIcon className={"mx-2"}/>
            <Typography>{walletBalance}c</Typography>
            <div className={"grow"}/>
            <IconButton onClick={addMoneyHandler}>
                <Add className={"text-white"}/>
            </IconButton>
        </div>
    )
};

export default Wallet;