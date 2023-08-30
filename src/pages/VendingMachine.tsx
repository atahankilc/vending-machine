import ProductShowcase from "../components/ProductShowcase";
import MachineController from "../components/MachineController";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const VendingMachine = () => {

    const userInformation = useSelector((state: RootState) => state.userReducer.userInformation);

    return (
        <div className={"vending-machine"}>
            <ProductShowcase/>
            {userInformation &&
                <MachineController/>
            }
        </div>
    )
};

export default VendingMachine;