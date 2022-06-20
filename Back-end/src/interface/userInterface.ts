import mongoose from "mongoose";


interface userDoc extends mongoose.Document {
    email: String,
    name: String,
    password: String,
    createdAt: Date,
    updatedAt: Date
}


export default userDoc;