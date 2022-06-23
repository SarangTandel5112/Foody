import createUser from "../model_sequelize/user";
import { Sequelize, DataType } from 'sequelize-typescript'
import createCart from "../model_sequelize/cart";

async function tablesync(db: any) {

    db.users = createUser(db.sequelize, DataType)
    db.cart = createCart(db.sequelize, DataType)

    await db.users.hasOne(db.cart, { onDelete: 'CASCADE' })
    await db.cart.belongsTo(db.users, { onDelete: 'CASCADE' })
    // db.cart.belongsTo(db.users, { foreignKey: 'id', onDelete: 'cascade', hooks: true })

    db.sequelize.sync()
        .then(() => {
            console.log("Successfully Sync");
        });
}

export default tablesync;