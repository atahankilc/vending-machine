import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Typography} from "@mui/material";
import React from "react";

const Controller = () => {

    const insertedCoin = useSelector((state: RootState) => state.coinReducer.inserted);
    const totalPrice = useSelector((state: RootState) => state.cartReducer.totalPrice);

    return (
        <div className={"controller"}>
            <Typography>Inserted Coin: {insertedCoin}</Typography>
            <Typography>Total Price: {totalPrice}</Typography>
        </div>
    );
};

export default Controller;