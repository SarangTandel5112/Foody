function createCartDetails(sequelize: any, DataType: any) {
    const Cartdetails = sequelize.define('cartdetails', {
        quantity: {
            type: DataType.INTEGER,
        },
        description: {
            type: DataType.STRING,
        }
    })
    return Cartdetails;
}

export default createCartDetails;