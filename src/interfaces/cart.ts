interface CartItemInterface {
    name: string,
    price: number,
    count: number
}

interface cartInterface {
    [productId: string]: CartItemInterface
}

export default cartInterface;