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
    const [open, setOpen] = React.useState(true);

    const dropDownHandler = () => {
        setOpen(!open);
    };

    const deleteCartHandler = () => {
        dispatch(cartActions.deleteCart());
    };

    return (
        <div className={"cart"}>
            <div className={"cart-header"}>
                <ShoppingBag className={"mx-2"}/>
                <Typography>Cart</Typography>
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
                                <Typography>{cartItem.count} Items</Typography>
                                <Typography>{cartItem.price * cartItem.count}c</Typography>
                            </div>
                        )
                    })
                }
            </Collapse>
        </div>
    );
};

export default Cart;