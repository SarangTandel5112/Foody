import mongoose from "mongoose";


interface userDoc extends mongoose.Document {
    email: String,
    name: String,
    password: String,
    cartId: String,
}


export default userDoc;