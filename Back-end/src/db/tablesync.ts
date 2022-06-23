import createUser from "../model_sequelize/user";
import { Sequelize, DataType } from 'sequelize-typescript'
import createCart from "../model_sequelize/cart";

function tablesync(db: any) {

    db.users = createUser(db.sequelize, DataType)
    db.cart = createCart(db.sequelize, DataType)

    db.users.hasOne(db.cart, { foreignKey: 'cartId' })
    db.cart.belongsTo(db.users, { foreignKey: 'userId' })

    db.sequelize.sync()
        .then(() => {
            console.log("Successfully Sync");
        })
}

export default tablesync;