import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Card, CardActions, CardContent, CardMedia, IconButton, TextField, Typography} from "@mui/material";
import {Add, Remove} from '@mui/icons-material';
import productInterface from "../interfaces/product";
import {cartActions} from "../store/cart";
import {RootState} from "../store";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {productActions} from "../store/product";

interface productProps {
    product: productInterface;
}

const Product: React.FC<productProps> = ({product}) => {

    const dispatch = useDispatch();
    const credential = useSelector((state: RootState) => state.userReducer.credential);
    const isSupplier = useSelector((state: RootState) => state.userReducer.isSupplier);
    const updateProductFlag = useSelector((state: RootState) => state.productReducer.updateProductFlag);
    const [newProductPrice, setNewProductPrice] = useState(product.price);
    const [newProductQuantity, setNewProductQuantity] = useState(product.quantity);

    const addToCartHandler = () => {
        dispatch(cartActions.addToCart(product));
    };

    const removeFromCartHandler = () => {
        dispatch(cartActions.removeFromCart(product));
    };

    const updateProductPriceHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setNewProductPrice(parseInt(e.target.value));
    }

    const updateProductQuantityHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setNewProductQuantity(parseInt(e.target.value));
    }

    useEffect(() => {
        async function fetchData() {
            if (newProductPrice === product.price && newProductQuantity == product.quantity) {
                return;
            }
            const newProduct: productInterface = {
                name: product.name,
                price: newProductPrice,
                quantity: newProductQuantity,
                image: product.image
            }
            const response = await axios.put("http://localhost:8080/api/product/update",
                newProduct,
                {headers: {"Authorization": "Bearer " + credential}})
                .catch((error) => {
                    enqueueSnackbar(error, {variant: "error"});
                });
            if (response) {
                const updatedProduct = response!.data;
                enqueueSnackbar(`Product ${updatedProduct.name} Updated!`, {variant: "success"});
                dispatch(productActions.updateProduct(updatedProduct));
            }
        }

        if (updateProductFlag) {
            fetchData();
        }
    }, [updateProductFlag])


    return (
        <Card className={"product"}>
            <CardMedia
                component="img"
                sx={{width: 160, height: 200}}
                image={product.image}
                alt={product.name}
            />
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <CardContent>
                    <Typography component="div" variant="h5">
                        {product.name}
                    </Typography>
                    {!isSupplier &&
                        <>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Price: {product.price}c
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Quantity: {product.quantity}
                            </Typography>
                        </>
                    }
                </CardContent>
                <CardActions>
                    {!isSupplier && credential &&
                        <>
                            <IconButton onClick={addToCartHandler}>
                                <Add/>
                            </IconButton>
                            <IconButton onClick={removeFromCartHandler}>
                                <Remove/>
                            </IconButton>
                        </>
                    }
                    {isSupplier &&
                        <div className={"flex flex-col"}>
                            <TextField
                                id="1"
                                label={`Price: ${product.price}c`}
                                type="number"
                                variant="standard"
                                InputProps={{inputProps: {min: 0}}}
                                sx={{margin: "0px 5px"}}
                                onChange={updateProductPriceHandler}
                            />
                            <TextField
                                id="1"
                                label={`Quantity: ${product.quantity}`}
                                type="number"
                                variant="standard"
                                InputProps={{inputProps: {min: 0}}}
                                sx={{margin: "0px 5px"}}
                                onChange={updateProductQuantityHandler}
                            />
                        </div>
                    }
                </CardActions>
            </Box>
        </Card>
    );
};

export default Product;