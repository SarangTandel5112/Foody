import { Sequelize, DataType } from 'sequelize-typescript'
import tablesync from './tablestyle';
import sequelizeDbInterface from '../interface/sequelizeDbInterface';


const sequelize = new Sequelize('khandla','sanjay','sAnjay@1234',{
  host: 'localhost',
  dialect:'mysql',
  logging: true, // true
  pool:{max:5,min:0,idle:10000},
});
sequelize.authenticate()
    .then(() => {
        console.log("Sequelize Connected");
    })
    .catch((error: any) => {
        console.log(error);
    })
const db: sequelizeDbInterface = {
  Sequelize, sequelize,
  users: undefined,
  cart: undefined
};

tablesync(db);

export default db;