import mongoose, { Schema, model } from "mongoose";

import cartDoc from "../interface/cartInterface";

const cartSchema = new mongoose.Schema ({
   
    cartDetailsId: [{
        type: Schema.Types.ObjectId,
        ref: "cartDetails",
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    totalPrice: {
        type:String,
        required: true,

    }
},{
    timestamps:true
});


const Restaurant = mongoose.model<cartDoc>("cart",cartSchema);

export default Restaurant;
