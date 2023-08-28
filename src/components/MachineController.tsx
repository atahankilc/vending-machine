import CoinAcceptor from "./CoinAcceptor";
import Cart from "./Cart";
import Controller from "./Controller";

const MachineController = () => {
    return (
        <div className={"machine-controller"}>
            <CoinAcceptor/>
            <Cart/>
            <Controller/>
        </div>
    );
};

export default MachineController;