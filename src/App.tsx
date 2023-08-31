import React from 'react';
import {Provider} from "react-redux";
import VendingMachine from "./pages/VendingMachine";
import store from "./store";
import Customer from "./components/Customer";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {SnackbarProvider} from "notistack";

function App() {
    return (
        <GoogleOAuthProvider clientId={"626539819723-4ufbirra1u0qgo2v3njfk71uv87lg9uf.apps.googleusercontent.com"}>
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
