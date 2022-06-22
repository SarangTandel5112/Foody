import mongoose from "mongoose";
import { ConnectionOptions } from "tls";

class connectDB {
    constructor() {
        mongoose.connect(process.env.DATABASE_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectionOptions).then( () => {
            console.log("Database has been Connected......");            
        }).catch((error) => {
            console.log("error in database connection......" + error);            
        })
    }
}

export default connectDB;