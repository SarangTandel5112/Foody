import createUser from "../model_sequelize/user";
import { Sequelize, DataType } from 'sequelize-typescript'

function tablesync(db: any) {
    db.users=createUser(db.sequelize,DataType)
    db.sequelize.sync()
        .then(() => {
            console.log("Successfully Sync");
        })
}

export default tablesync;