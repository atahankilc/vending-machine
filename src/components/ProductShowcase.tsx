import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress, Grid} from "@mui/material";
import Product from "./Product";
import productInterface from "../interfaces/product";
import {RootState} from "../store";
import {productActions} from "../store/product";
import axios from "axios";
import {enqueueSnackbar} from "notistack";

const ProductShowcase = () => {

    const dispatch = useDispatch();
    const productList = useSelector((state: RootState) => state.productReducer.list);
    const requestFetch = useSelector((state: RootState) => state.productReducer.requestFetch);
    const [isLoading, setIsLoading] = useState(false);

    // TODO: use redux asyncThunk? error message?
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const response = await axios.get("http://localhost:8080/api/product/getAll")
                .catch((error) => {
                    enqueueSnackbar(error, {variant: "error"});
                });
            if (response) {
                const productList: productInterface[] = response!.data;
                dispatch(productActions.changeProductList(productList));
            }
            setIsLoading(false);
        }

        if (requestFetch) {
            fetchData();
        }
    }, [requestFetch, dispatch]);

    return (
        <div className={`product-showcase ${isLoading && "justify-center"}`}>
            {!isLoading && <Grid container>
                {productList.map((product: productInterface, index) => {
                    return (
                        <Grid item xs={6} key={index}>
                            <Product product={product} key={product.name}/>
                        </Grid>
                    )
                })}
            </Grid>}
            {isLoading &&
                <CircularProgress/>
            }
        </div>
    );
};

export default ProductShowcase;