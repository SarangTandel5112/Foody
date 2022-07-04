import { Sequelize,DataTypes} from "sequelize";
import tablesync from './tableSync';
import sequelizeDb from '../interface/sequelizeDbInterface';

const sequelize = new Sequelize('foody','Manish_Admin','Manish@123',{
    host: 'localhost',
    dialect:'mysql',
    logging: false, // true
    pool:{max:5,min:0,idle:10000},
});

sequelize.authenticate()
.then(()=> {
    console.log('mysql to connected');   
})
.catch(err => {
    console.log('error: ' + err.message);
})

const db: sequelizeDb = { Sequelize, sequelize };

tablesync(db);

export default db;
