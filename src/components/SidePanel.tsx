import CoinAcceptor from "./CoinAcceptor";
import Cart from "./Cart";
import Controller from "./Controller";
import SupplierPanel from "./SupplierPanel";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const SidePanel = () => {

    const isSupplier = useSelector((state: RootState) => state.userReducer.isSupplier);
    const userInformation = useSelector((state: RootState) => state.userReducer.userInformation);

    return (
        <div className={"side-panel"}>

            {userInformation &&
                <>
                    {!isSupplier &&
                        <>
                            <CoinAcceptor/>
                            <Cart/>
                            <Controller/>
                        </>
                    }
                    <SupplierPanel/>
                </>
            }
        </div>
    );
};

export default SidePanel;