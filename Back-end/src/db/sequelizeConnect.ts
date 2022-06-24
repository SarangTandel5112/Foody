import { Sequelize, DataType } from 'sequelize-typescript'
import tablesync from './tablesync';
import sequelizeDb from '../interface/sequelizeDbInterface';

const sequelize = new Sequelize('lucky', 'sanjay', 'sAnjay@1234', {
    host: 'localhost',
    dialect: 'mysql',
    pool: { max: 5, min: 0, idle: 10000 },
    logging: false
});

sequelize.authenticate()    
    .then(() => {
        console.log("Sequelize Connected");
    })
    .catch((error: any) => {
        console.log(error);
    })
const db: sequelizeDb = { Sequelize, sequelize };

tablesync(db);

export default db;