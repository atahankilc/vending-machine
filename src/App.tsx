import React from 'react';
import {Provider} from "react-redux";
import VendingMachine from "./pages/VendingMachine";
import store from "./store";
import Customer from "./components/Customer";
import {GoogleOAuthProvider} from "@react-oauth/google";

function App() {
    return (
        <GoogleOAuthProvider clientId={"626539819723-4ufbirra1u0qgo2v3njfk71uv87lg9uf.apps.googleusercontent.com"}>
            <Provider store={store}>
                <div className={"application"}>
                    <Customer/>
                    <VendingMachine/>
                </div>
            </Provider>
        </GoogleOAuthProvider>
    );
}

export default App;
