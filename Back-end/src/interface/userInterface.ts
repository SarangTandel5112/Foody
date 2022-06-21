import mongoose from "mongoose";


interface userDoc extends mongoose.Document {
    email: String,
    name: String,
    password: String,
    address : String,
    phone :{
        type:Number,
        unique : true, 
    } 
}


export default userDoc;