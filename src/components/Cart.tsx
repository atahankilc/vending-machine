import React from "react";
import {ButtonGroup, Collapse, IconButton, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import cartInterface from "../interfaces/cart";
import {RootState} from "../store";
import {ExpandLess, ExpandMore, Delete, ShoppingBag} from "@mui/icons-material";
import {cartActions} from "../store/cart";

const Cart = () => {

    const dispatch = useDispatch();
    const cart: cartInterface = useSelector((state: RootState) => state.cartReducer.dict);
    const totalCount = useSelector((state: RootState) => state.cartReducer.totalCount);
    const totalPrice = useSelector((state: RootState) => state.cartReducer.totalPrice);
    const [open, setOpen] = React.useState(false);

    const dropDownHandler = () => {
        setOpen(!open);
    }

    const deleteCartHandler = () => {
        dispatch(cartActions.deleteCart());
    }

    return (
        <div className={"cart"}>
            <div className={"cart-header"}>
                <ShoppingBag className={"mx-2"}/>
                <div className={"flex flex-col mx-1"}>
                    <Typography>Product Count: {totalCount}</Typography>
                    <Typography>Total Price: {totalPrice}c</Typography>
                </div>
                <div className={"grow"}/>
                <ButtonGroup>
                    {Object.keys(cart).length > 0 &&
                        <IconButton onClick={deleteCartHandler}>
                            <Delete className={"text-white"}/>
                        </IconButton>
                    }
                    {!open &&
                        <IconButton onClick={dropDownHandler}>
                            <ExpandMore className={"text-white"}/>
                        </IconButton>
                    }
                    {open &&
                        <IconButton onClick={dropDownHandler}>
                            <ExpandLess className={"text-white"}/>
                        </IconButton>
                    }
                </ButtonGroup>
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {Object.keys(cart).length > 0 &&
                    Object.keys(cart).map(key => {
                        const cartItem = cart[key];
                        return (
                            <div key={key} className={"cart-item"}>
                                <Typography>{cartItem.name}</Typography>
                                <Typography>Count: {cartItem.count}</Typography>
                                <Typography>Price: {cartItem.price * cartItem.count}c</Typography>
                            </div>
                        )
                    })
                }
            </Collapse>
        </div>
    );
}

export default Cart;