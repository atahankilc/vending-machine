import {useDispatch, useSelector} from "react-redux";
import WalletIcon from "@mui/icons-material/Wallet";
import {RootState} from "../store";
import {Collapse, IconButton, TextField, Typography} from "@mui/material";
import {Add, Done} from "@mui/icons-material";
import React, {useState} from "react";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {userActions, userInformationInterface} from "../store/user";

const Wallet = () => {

    const dispatch = useDispatch();
    const credential = useSelector((state: RootState) => state.userReducer.credential);
    const walletBalance = useSelector((state: RootState) => state.userReducer.userInformation!.wallet);
    const [isAddMoney, setIsAddMoney] = useState(false);
    const [moneyAmount, setMoneyAmount] = useState(0);

    const changeMoneyHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setMoneyAmount(parseInt(e.target.value));
    }

    const addMoneyHandler = () => {
        // TODO: mockup service? loading indicator?
        async function fetchData() {
            const response = await axios.put("https://vending-machine-backend-6ov3.onrender.com/api/user/addMoney",
                moneyAmount,
                {headers: {"Authorization": "Bearer " + credential, "Content-Type": "application/json"}})
                .catch((error) => {
                    enqueueSnackbar(error, {variant: "error"});
                });
            if (response) {
                const userInformation: userInformationInterface = response!.data;
                dispatch(userActions.changeUserInformation(userInformation));
                setIsAddMoney(false);
                setMoneyAmount(0);
                enqueueSnackbar("Money Added!", {variant: "success"})
            }
        }
        if (isAddMoney) {
            if (moneyAmount === 0) {
                enqueueSnackbar("What Money?", {variant: "error"})
                return;
            }
            fetchData();
        } else {
            setIsAddMoney(true);
        }
    }

    return (
        <div className={"wallet"}>
            <WalletIcon className={"mx-2"}/>
            <Typography>{walletBalance}c</Typography>
            <div className={"grow"}/>
            {!isAddMoney &&
                <IconButton onClick={addMoneyHandler}>
                    <Add className={"text-white"}/>
                </IconButton>
            }
            {isAddMoney &&
                <Collapse in={isAddMoney} timeout="auto" unmountOnExit>
                    <div className={"flex flex-row ml-3 bg-light-purple"}>
                        <TextField
                            sx={{margin: "5px"}}
                            label="Money Amount"
                            variant="standard"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={changeMoneyHandler}
                        />
                        <div className={"grow"}/>
                        <IconButton onClick={addMoneyHandler}>
                            <Done/>
                        </IconButton>
                    </div>
                </Collapse>
            }
        </div>
    )
};

export default Wallet;