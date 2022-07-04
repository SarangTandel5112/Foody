import { Sequelize, DataType } from 'sequelize-typescript'
import usersAdd from'../seq_models/user';
import addRestaurant from "../seq_models/restaurant";
import addFood from"../seq_models/food";

async function tablesync(db: any) {
    db.users = usersAdd(db.sequelize,DataType);
    db.restaurant = addRestaurant(db.sequelize,DataType);
    db.food = addFood(db.sequelize,DataType);


    db.sequelize.sync()         
    .then(() => {
        console.log("Successfully Sync");
    });
}

export default tablesync;
