import mongoose, { Schema, model } from "mongoose";

import orderDoc from "../interface/orderInterface";

const orderSchema = new mongoose.Schema({

    cartId:{
        type: Schema.Types.ObjectId,
        ref: "cart",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    foodId:{
        type: Schema.Types.ObjectId,
        ref: "food",
    },
    quantity:{
        type: String
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    orderDate:{
         type: Date, 
         default:Date.now,
    },
    orderStatus:{ 
        type: String, 
        enum : ['Deliverd','UnDeliverd'],
      
    },
    totalPrice: {
        type: Number,

    }
}, { timestamps: true });


const order = mongoose.model<orderDoc>("order", orderSchema);

export default order;
