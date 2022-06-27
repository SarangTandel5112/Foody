import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Routes from './Routes/route';
import connectDB from './db/connectDB';
import User from './models/user';
import cookieparser from 'cookie-parser';
import passport from 'passport';
import "express-async-errors";
import errorhandling from "./log/error"
import "./db/sequelizeConnect"

dotenv.config();
dotenv.config({path:'/home/sanjay/VSC/zometo/.env'});



// const db = new connectDB();

const router = new Routes().router

class app {

    public app: express.Application = express();

    constructor() {
        this.middleWare();
        this.routes();
        this.connection();
        // this.app.use(passport.initialize());
        // this.app.use(passport.session());
        this.app.use(errorhandling);
    }

    private middleWare(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieparser());
    }

    private routes(): void {
        this.app.use('/', router)
    }

    private connection(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(`server is listening to this ${process.env.PORT}`);
        })
    }


}

export default new app().app;