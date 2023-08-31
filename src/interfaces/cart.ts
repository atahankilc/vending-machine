interface CartItemInterface {
    name: string,
    price: number,
    count: number
}

interface cartInterface {
    [productName: string]: CartItemInterface
}

export default cartInterface;