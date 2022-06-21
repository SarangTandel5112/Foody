import mongoose from "mongoose";
import userDoc from "../interface/userInterface";

const userSchema = new mongoose.Schema ({

    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },

},{timestamps:true});

const User = mongoose.model<userDoc>("User", userSchema);

export default User;





