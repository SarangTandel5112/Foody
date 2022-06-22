import mongoose from "mongoose";
import {Types} from "mongoose";

interface foodinterface extends mongoose.Document {
    name:String,
    description:String,
    restaurantId:[Types.ObjectId],
    price:Number,
    rating:Number,
    status:String,
};


export default foodinterface;