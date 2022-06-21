import mongoose, { Schema, model } from "mongoose";

import cartDoc from "../interface/cartInterface";

const cartSchema = new mongoose.Schema ({
   
    foodId: [{
        type: Schema.Types.ObjectId,
        ref: "food",
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    totalPrice: {
        type:Number,
        default:0,
        required: true,

    }
});


const Restaurant = mongoose.model<cartDoc>("cart",cartSchema);

export default Restaurant;
