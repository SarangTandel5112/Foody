import { Sequelize, DataType } from 'sequelize-typescript'
import usersAdd from'../seq_models/user';

async function tablesync(db: any) {
    db.users =  usersAdd(db.sequelize,DataType);


    db.sequelize.sync()         
    .then(() => {
        console.log("Successfully Sync");
    });
}

export default tablesync;
