import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress, Grid} from "@mui/material";
import Product from "./Product";
import productInterface from "../interfaces/product";
import {RootState} from "../store";
import {productActions} from "../store/product";

const ProductShowcase = () => {

    const dispatch = useDispatch();
    const productList = useSelector((state: RootState) => state.productReducer.list);
    const [isLoading, setIsLoading] = useState(false);

    // TODO
    // use redux asyncThunk
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const response = await fetch("http://localhost:8080/api/products");
            const data: productInterface[] = await response.json();
            dispatch(productActions.changeProductList(data));
            setIsLoading(false);
        }
        fetchData();
        console.log("fetching data");
    }, [dispatch]);

    return (
        <div className={`product-showcase ${isLoading && "justify-center"}`}>
            {!isLoading && <Grid container>
                {productList.map((product: productInterface, index) => {
                    return (
                        <Grid item xs={6} key={index}>
                            <Product product={product} key={product.id}/>
                        </Grid>
                    )
                })}
            </Grid>}
            {isLoading &&
                <CircularProgress/>
            }
        </div>
    );
}

export default ProductShowcase;