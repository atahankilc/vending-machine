import ProductShowcase from "../components/ProductShowcase";
import MachineController from "../components/MachineController";

const VendingMachine = () => {
    return (
        <div className={"vending-machine"}>
            <ProductShowcase/>
            <MachineController/>
        </div>
    )
}

export default VendingMachine;