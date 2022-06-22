import mongoose, { Schema, model } from "mongoose";
import userDoc from "../interface/userInterface";

const userSchema = new mongoose.Schema ({

    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    cartId: {
        type: Schema.Types.ObjectId,
        ref:"cart",
        // default: "o",
    },
    address: { type: String, required: true },
    phone: { type: String, required: true, unique: true },

},{timestamps:true});

const User = mongoose.model<userDoc>("User", userSchema);

export default User;





