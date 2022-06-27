import mongoose, { Schema, model } from "mongoose";
import userDoc from "../interface/userInterface";

const userSchema = new mongoose.Schema ({

    email: { type: String,  unique: true },
    name: { type: String },
    password: { type: String },
    cartId: {
        type: Schema.Types.ObjectId,
        ref:"cart",
    },
    address: { type: String },
    phone: { type: String, unique: true },

},{timestamps:true});

const User = mongoose.model<userDoc>("User", userSchema);

export default User;





