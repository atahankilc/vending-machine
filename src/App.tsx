import React from 'react';
import {Provider} from "react-redux";
import VendingMachine from "./pages/VendingMachine";
import store from "./store";
import Customer from "./components/Customer";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {SnackbarProvider} from "notistack";

function App() {
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
            <SnackbarProvider maxSnack={5}>
                <Provider store={store}>
                    <div className={"application"}>
                        <Customer/>
                        <VendingMachine/>
                    </div>
                </Provider>
            </SnackbarProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
