import createUser from "../model_sequelize/user";
import { Sequelize, DataType } from 'sequelize-typescript'
import createCart from "../model_sequelize/cart";
import createCartDetails from "../model_sequelize/cartDetails";

async function tablesync(db: any) {

    db.users = createUser(db.sequelize, DataType)
    db.cart = createCart(db.sequelize, DataType)
    db.cartdetails = createCartDetails(db.sequelize, DataType) 

    

    await db.users.hasOne(db.cart, { onDelete: 'CASCADE' })
    await db.cart.belongsTo(db.users, { onDelete: 'CASCADE' })
    await db.cart.hasMany(db.cartdetails, { onDelete: 'CASCADE' })
    await db.cartdetails.belongsTo(db.cart, { onDelete: 'CASCADE' })
    // db.cart.belongsTo(db.users, { foreignKey: 'id', onDelete: 'cascade', hooks: true })

    db.sequelize.sync()
        .then(() => {
            console.log("Successfully Sync");
        });
}

export default tablesync;