import ProductShowcase from "../components/ProductShowcase";
import SidePanel from "../components/SidePanel";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const VendingMachine = () => {

    const userInformation = useSelector((state: RootState) => state.userReducer.userInformation);

    return (
        <div className={"vending-machine"}>
            {userInformation &&
                <>
                <ProductShowcase/>
                <SidePanel/>
                </>
            }
        </div>
    )
};

export default VendingMachine;