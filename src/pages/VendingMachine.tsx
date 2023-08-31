import ProductShowcase from "../components/ProductShowcase";
import SidePanel from "../components/SidePanel";

const VendingMachine = () => {

    return (
        <div className={"vending-machine"}>
            <ProductShowcase/>
            <SidePanel/>
        </div>
    )
};

export default VendingMachine;