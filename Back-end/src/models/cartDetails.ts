import mongoose, { Schema, model } from "mongoose";

import cartDetails from "../interface/cartDetailsInterface";

const cartDetailsSchema = new mongoose.Schema ({
   
    foodId: [{
        type: Schema.Types.ObjectId,
        ref: "food",
    }],
    quantity:{ 
        type: Number, required: true
    },
    description:{ 
        type: String, required: true
    },
},{
    timestamps:true
});


const Restaurant = mongoose.model<cartDetails>("cartDetails",cartDetailsSchema);

export default Restaurant;
