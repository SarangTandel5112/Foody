import createUser from "../model_sequelize/user";
import { Sequelize, DataType } from 'sequelize-typescript'
import createCart from "../model_sequelize/cart";
import createCartDetails from "../model_sequelize/cartDetails";
// import food from "../models/food";
import Restaurant from "../model_sequelize/restaurant";
import Food from "../model_sequelize/food";

async function tablesync(db: any) {

    db.users = createUser(db.sequelize, DataType)
    db.cart = createCart(db.sequelize, DataType)
    db.cartdetails = createCartDetails(db.sequelize, DataType)
    db.restaurant = Restaurant(db.sequelize, DataType)
    db.food = Food(db.sequelize, DataType)

    await db.users.hasOne(db.cart, { onDelete: 'CASCADE' })
    await db.cart.belongsTo(db.users, { onDelete: 'CASCADE' })
    await db.cart.hasMany(db.cartdetails, { onDelete: 'CASCADE' })
    await db.cartdetails.belongsTo(db.cart, { onDelete: 'CASCADE' })
    await db.food.hasMany(db.cartdetails, { onDelete: 'CASCADE' })
    await db.cartdetails.belongsTo(db.food, { onDelete: 'CASCADE' })
    await db.restaurant.hasMany(db.food, { onDelete: 'CASCADE' })
    await db.food.belongsTo(db.restaurant, { onDelete: 'CASCADE' })

    db.sequelize.sync()
        .then(() => {
            console.log("Successfully Sync");
        });
}

export default tablesync;