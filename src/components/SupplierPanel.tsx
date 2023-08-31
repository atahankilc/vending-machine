import {Button, ButtonGroup, IconButton, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "../store/product";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {RootState} from "../store";
import {userActions} from "../store/user";
import {Done} from "@mui/icons-material";
import React from "react";

const SupplierPanel = () => {

    const dispatch = useDispatch();
    const credential = useSelector((state: RootState) => state.userReducer.credential);
    const isSupplier = useSelector((state: RootState) => state.userReducer.isSupplier);
    const [supplierCode, setSupplierCode] = React.useState("");
    const [newProduct, setNewProduct] = React.useState({name: "", price: 0, quantity: 0, image: ""});
    const [removeProductName, setRemoveProductName] = React.useState("");

    const supplierCodeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSupplierCode(e.target.value);
    }

    // TODO: encryption?
    const enterToSupplierModeHandler = () => {
        async function fetchData() {
            const response = await axios.post("http://localhost:8080/api/users/supplierMode",
                supplierCode,
                {headers: {"Authorization": "Bearer " + credential, "Content-Type": "application/json"}})
                .catch((error) => {
                    enqueueSnackbar(error, {variant: "error"});
                });
            if (response) {
                dispatch(userActions.enterToSupplierMode());
            }
        }

        fetchData();
    }

    const changeNewProductHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setNewProduct(prevState => {
            return {
                ...prevState,
                [e.target.id]: e.target.value
            }
        })
    }

    const addProductHandler = () => {
        async function fetchData() {
            const response = await axios.post("http://localhost:8080/api/products/add",
                newProduct,
                {headers: {"Authorization": "Bearer " + credential, "Content-Type": "application/json"}})
                .catch((error) => {
                    enqueueSnackbar(error, {variant: "error"});
                });
            if (response) {
                dispatch(productActions.requestFetch());
            }
        }

        if (newProduct.name == "" || newProduct.price == 0 || newProduct.quantity == 0 || newProduct.image == "") {
            enqueueSnackbar("There Should Be No Unfilled Fields!", {variant: "error"});
            return;
        }
        fetchData();
    }

    const changeRemoveProductHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRemoveProductName(e.target.value);
    }

    const removeProductHandler = () => {
        async function fetchData() {
            const response = await axios.delete(`http://localhost:8080/api/products/remove/${removeProductName}`,
                {headers: {"Authorization": "Bearer " + credential, "Content-Type": "application/json"}})
                .catch((error) => {
                    enqueueSnackbar(error, {variant: "error"});
                });
            if (response) {
                dispatch(productActions.requestFetch());
            }
        }

        if (removeProductName == "") {
            enqueueSnackbar("There Should Be No Unfilled Fields!", {variant: "error"});
            return;
        }
        fetchData();
    }

    const collectMoneyHandler = () => {
        async function fetchData() {
            const response = await axios.get("http://localhost:8080/api/checkout/collect",
                {headers: {"Authorization": "Bearer " + credential}})
                .catch((error) => {
                    enqueueSnackbar(error, {variant: "error"});
                });
            if (response) {
                const collectedCoin = response!.data;
                enqueueSnackbar(`${collectedCoin}c Retrieved!`, {variant: "success"});
            }
        }

        fetchData();
    }

    const requestProductUpdateHandler = () => {
        dispatch(productActions.requestProductUpdate());
    };

    const exitFromSupplierModeHandler = () => {
        setSupplierCode("");
        setNewProduct({name: "", price: 0, quantity: 0, image: ""});
        setRemoveProductName("");
        dispatch(userActions.exitFromSupplierMode());
    }

    return (
        <>
            {!isSupplier &&
                <>
                    <div className={"grow"}/>
                    <div className={"lock"}>
                        <TextField
                            sx={{color: "white", margin: "0 0 10px 10px"}}
                            label="Supplier Code"
                            type="password"
                            variant="standard"
                            onChange={supplierCodeHandler}
                        />
                        <div className={"grow"}/>
                        <ButtonGroup>
                            <IconButton onClick={enterToSupplierModeHandler}>
                                <Done/>
                            </IconButton>
                        </ButtonGroup>
                    </div>
                </>
            }
            {isSupplier &&
                <div className={"supplier-panel"}>
                    <div className={"flex flex-col border bg-white my-2"}>
                        <TextField
                            id="name"
                            label={`Name`}
                            type="string"
                            variant="standard"
                            sx={{margin: "0px 5px"}}
                            onChange={changeNewProductHandler}
                        />
                        <TextField
                            id="price"
                            label={`Price`}
                            type="number"
                            variant="standard"
                            InputProps={{inputProps: {min: 0}}}
                            sx={{margin: "0px 5px"}}
                            onChange={changeNewProductHandler}
                        />
                        <TextField
                            id="quantity"
                            label={`Quantity`}
                            type="number"
                            variant="standard"
                            InputProps={{inputProps: {min: 0}}}
                            sx={{margin: "0px 5px"}}
                            onChange={changeNewProductHandler}
                        />
                        <TextField
                            id="image"
                            label={`Image`}
                            type="string"
                            variant="standard"
                            sx={{margin: "0px 5px"}}
                            onChange={changeNewProductHandler}
                        />
                        <Button onClick={addProductHandler}> Add Product </Button>
                    </div>
                    <div className={"flex flex-col border bg-white my-2"}>
                        <TextField
                            id="name"
                            label={`Name`}
                            type="string"
                            variant="standard"
                            sx={{margin: "0px 5px"}}
                            onChange={changeRemoveProductHandler}
                        />
                        <Button onClick={removeProductHandler}> Remove Product </Button>
                    </div>
                    <Button onClick={collectMoneyHandler}> Collect Money </Button>
                    <Button onClick={requestProductUpdateHandler}> Apply Product Changes </Button>
                    <Button onClick={exitFromSupplierModeHandler}> Exit From Supplier Mode </Button>
                </div>
            }
        </>
    );
};

export default SupplierPanel;