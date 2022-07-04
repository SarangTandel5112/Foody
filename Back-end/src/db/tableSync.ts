import { Sequelize, DataType } from 'sequelize-typescript'
import usersAdd from'../seq_models/user';
import addRestaurant from "../seq_models/restaurant";

async function tablesync(db: any) {
    db.users = usersAdd(db.sequelize,DataType);
    db.restaurant = addRestaurant(db.sequelize,DataType);


    db.sequelize.sync()         
    .then(() => {
        console.log("Successfully Sync");
    });
}

export default tablesync;
