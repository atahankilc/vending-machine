import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Typography} from "@mui/material";
import Wallet from "./Wallet";
import {userActions, userInformationInterface} from "../store/user";
import {RootState} from "../store";
import {useEffect} from "react";
import axios from "axios";
import {enqueueSnackbar} from "notistack";

const Customer = () => {

    const dispatch = useDispatch();
    const userInformation = useSelector((state: RootState) => state.userReducer.userInformation);
    const credential = useSelector((state: RootState) => state.userReducer.credential);

    const loginHandler = (credentialResponse: CredentialResponse) => {
        dispatch(userActions.loginUser(credentialResponse.credential));
    };

    const loginErrorHandler = () => {
        enqueueSnackbar('An Error Occurred!', { variant: "error" });
    }

    const logoutHandler = () => {
        dispatch(userActions.logoutUser());
    }

    // TODO: loading spinner? login inside component?
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("https://vending-machine-backend-6ov3.onrender.com/api/user/me",
                {headers: {"Authorization": "Bearer " + credential}})
                .catch((error) => {
                    enqueueSnackbar(error, { variant: "error" });
                });
            const userInformation: userInformationInterface = response!.data;
            dispatch(userActions.changeUserInformation(userInformation));
        }

        if (credential) {
            fetchData();
        }
    }, [credential]);


    return (
        <div className={"customer"}>
            {userInformation &&
                <>
                    <Avatar variant="square" alt={userInformation!.name} src={userInformation!.picture}/>
                    <Typography margin="10px">{userInformation!.name}</Typography>
                    <div className={"grow"}/>
                    <Wallet/>
                    <div className={"button-wrapper"}>
                        <Button onClick={logoutHandler}>
                            <Typography className={"button-text"}>Logout</Typography>
                        </Button>
                    </div>
                </>
            }
            {!userInformation &&
                <>
                    <div className={"grow"}/>
                    <GoogleLogin
                        onSuccess={loginHandler}
                        onError={loginErrorHandler}
                        theme={"filled_black"}
                        size={"medium"}
                        locale={"en"}
                    />
                </>
            }
        </div>
    );
};

export default Customer;
