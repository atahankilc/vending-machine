import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ButtonGroup, Collapse, IconButton, TextField, Typography} from "@mui/material";
import {AttachMoney, Done, ExpandLess, ExpandMore} from "@mui/icons-material";
import {userActions} from "../store/user";
import axios from "axios";
import {RootState} from "../store";
import {enqueueSnackbar} from "notistack";

const CoinAcceptor = () => {

    const dispatch = useDispatch();
    const credential = useSelector((state: RootState) => state.userReducer.credential);
    const [open, setOpen] = React.useState(true);
    const coin1Ref = useRef<HTMLInputElement>();
    const coin5Ref = useRef<HTMLInputElement>();
    const coin10Ref = useRef<HTMLInputElement>();
    const coin20Ref = useRef<HTMLInputElement>();

    const dropDownHandler = () => {
        setOpen(!open);
    };

    const insertCoinHandler = () => {
        let insertedCoin = 0;
        insertedCoin += isNaN(parseInt(coin1Ref.current!.value)) ? 0 : parseInt(coin1Ref.current!.value);
        insertedCoin += isNaN(parseInt(coin5Ref.current!.value)) ? 0 : parseInt(coin5Ref.current!.value) * 5;
        insertedCoin += isNaN(parseInt(coin10Ref.current!.value)) ? 0 : parseInt(coin10Ref.current!.value) * 10;
        insertedCoin += isNaN(parseInt(coin20Ref.current!.value)) ? 0 : parseInt(coin20Ref.current!.value) * 20;

        // TODO: thunk
        async function fetchData() {
            const response = await axios.post("http://localhost:8080/api/users/insertCoin",
                insertedCoin,
                {headers: {"Authorization": "Bearer " + credential, "Content-Type": "application/json"}})
                .catch((error) => {
                    enqueueSnackbar(error, {variant: "error"});
                });
            if (response) {
                dispatch(userActions.insertCoin(insertedCoin));
                enqueueSnackbar("Coins Inserted Successfully", {variant: "success"})
            }
        }

        fetchData();
    };

    return (
        <div className={"coin-acceptor"}>
            <div className={"coin-acceptor-header"}>
                <AttachMoney className={"mx-2"}/>
                <Typography>Coin Acceptor</Typography>
                <div className={"grow"}/>
                <ButtonGroup>
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
                <div className={"coin-acceptor-body"}>
                    <TextField
                        id="1"
                        label="1c"
                        type="number"
                        variant="standard"
                        InputProps={{inputProps: {min: 0}}}
                        sx={{margin: "0px 5px"}}
                        inputRef={coin1Ref}
                    />
                    <TextField
                        id="5"
                        label="5c"
                        type="number"
                        variant="standard"
                        InputProps={{inputProps: {min: 0}}}
                        sx={{margin: "0px 5px"}}
                        inputRef={coin5Ref}
                    />
                    <TextField
                        id="10"
                        label="10c"
                        type="number"
                        variant="standard"
                        InputProps={{inputProps: {min: 0}}}
                        sx={{margin: "0px 5px"}}
                        inputRef={coin10Ref}
                    />
                    <TextField
                        id="20"
                        label="20c"
                        type="number"
                        variant="standard"
                        InputProps={{inputProps: {min: 0}}}
                        sx={{margin: "0px 5px"}}
                        inputRef={coin20Ref}
                    />
                </div>
                <div className={"coin-acceptor-actions"}>
                    <IconButton onClick={insertCoinHandler}>
                        <Done/>
                    </IconButton>
                </div>
            </Collapse>
        </div>
    );
};

export default CoinAcceptor;