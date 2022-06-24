import mongoose, { Schema, model } from "mongoose";

import orderDoc from "../interface/orderInterface";

const orderSchema = new mongoose.Schema({

    cartDetailsId: [{
        type: Schema.Types.ObjectId,
        ref: "cartDetails",
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    totalPrice: {
        type: Number,
        required: true,
    }, 
    orderDate:{
         type: Date, 
         default:Date.now,
    },
    orderStatus:{ 
        type: String, 
        enum : ['Proccess','Deliverd','UnDeliverd'],
        default:"Proccess",     
    },
}, { timestamps: true });


const order = mongoose.model<orderDoc>("order", orderSchema);

export default order;
