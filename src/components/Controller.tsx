import React from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {IconButton, Typography} from "@mui/material";
import {Close, Done} from "@mui/icons-material";
import {userActions} from "../store/user";
import {RootState} from "../store";
import {cartActions} from "../store/cart";
import {productActions} from "../store/product";
import {enqueueSnackbar} from "notistack";

const Controller = () => {

    const dispatch = useDispatch();
    const credential = useSelector((state: RootState) => state.userReducer.credential);
    const insertedCoin = useSelector((state: RootState) => state.userReducer.userInformation!.inserted);
    const cartDict = useSelector((state: RootState) => state.cartReducer.dict);
    const totalPrice = useSelector((state: RootState) => state.cartReducer.totalPrice);

    const completeRequestHandler = () => {
        async function fetchData() {
            const itemList = Object.values(cartDict);
            const response = await axios.post("http://localhost:8080/api/checkout",
                {itemList},
                {headers: {"Authorization": "Bearer " + credential, "Content-Type": "application/json"}})
                .catch((error) => {
                    enqueueSnackbar(error, {variant: "error"});
                });
            if (response) {
                const data = response!.data;
                dispatch(cartActions.deleteCart());
                dispatch(userActions.returnCoin(data.returnedCoin));
                dispatch(productActions.requestFetch());
                enqueueSnackbar(data.returnedCoin + "c Returned!", {variant: "info"});
                data.returnedProduct.itemList.forEach((product: any) => {
                    enqueueSnackbar(product.name + " x" + product.count + " Returned!", {variant: "info"});
                })
            }
        }

        fetchData();
    }

    const cancelRequestHandler = () => {
        async function fetchData() {
            const response = await axios.get("http://localhost:8080/api/user/refundCoin",
                {headers: {"Authorization": "Bearer " + credential}})
                .catch((error) => {
                    enqueueSnackbar(error, {variant: "error"});
                });
            if (response) {
                dispatch(userActions.changeUserInformation(response!.data));
                enqueueSnackbar("Coins Refunded!", {variant: "success"});
            }
        }

        if (insertedCoin === 0) {
            enqueueSnackbar("What Coin?", {variant: "error"});
            return;
        }
        fetchData();
    }

    return (
        <div className={"controller"}>
            <div className={"py-2"}>
                <Typography className={"label"}>{insertedCoin}c Inserted</Typography>
                <Typography className={"label"}>{totalPrice}c Estimated Cost</Typography>
            </div>
            <div className={"button-wrapper bg-white"}>
                <IconButton onClick={completeRequestHandler}>
                    <Done/>
                </IconButton>
                <IconButton onClick={cancelRequestHandler}>
                    <Close/>
                </IconButton>
            </div>
        </div>
    );
};

export default Controller;