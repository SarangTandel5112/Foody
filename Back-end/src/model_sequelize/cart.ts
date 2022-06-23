function createCart(sequelize: any, DataType: any) {
    const Cart = sequelize.define('carts', {
        totalPrice: {
            type: DataType.INTEGER,
            default: 0,
        },
        cartId: {
            type: DataType.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            }
        }
    })
    return Cart;
}

export default createCart;