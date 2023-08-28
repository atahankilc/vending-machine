import React from "react";
import {useDispatch} from "react-redux";
import {Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import {Add, Remove} from '@mui/icons-material';
import productInterface from "../interfaces/product";
import {cartActions} from "../store/cart";

interface productProps {
    product: productInterface;
}

const Product: React.FC<productProps> = ({product}) => {

    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(cartActions.addToCart(product));
    };

    const removeFromCartHandler = () => {
        dispatch(cartActions.removeFromCart(product));
    };

    return (
        <Card className={"product"}>
            <CardMedia
                component="img"
                sx={{width: 160}}
                image={product.image}
                alt={product.name}
            />
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <CardContent>
                    <Typography component="div" variant="h5">
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Price: {product.price}c
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Quantity: {product.quantity}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={addToCartHandler}>
                        <Add/>
                    </IconButton>
                    <IconButton onClick={removeFromCartHandler}>
                        <Remove/>
                    </IconButton>
                </CardActions>
            </Box>
        </Card>
    );
};

export default Product;