import React from 'react';
import {Provider} from "react-redux";
import VendingMachine from "./pages/VendingMachine";
import store from "./store";

function App() {
    return (
        <Provider store={store}>
            <div className={"application"}>
                <VendingMachine/>
            </div>
        </Provider>
    );
}

export default App;
