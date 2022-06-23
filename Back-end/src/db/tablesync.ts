import createUser from "../model_sequelize/user";
import { Sequelize, DataType } from 'sequelize-typescript'
import createCart from "../model_sequelize/cart";

function tablesync(db: any) {

    db.users = createUser(db.sequelize, DataType)
    db.cart = createCart(db.sequelize, DataType)

    db.users.hasOne(db.cart, { foreignKey: 'id', onDelete: 'cascade', hooks: true })
    db.cart.belongsTo(db.users, { foreignKey: 'id', onDelete: 'cascade', hooks: true })

    db.sequelize.sync({ alter: true, force: true })
        .then(() => {
            console.log("Successfully Sync");
        })
}

export default tablesync;