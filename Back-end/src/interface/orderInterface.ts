import mongoose,{ Types } from "mongoose";


interface orderDoc extends mongoose.Document {
    cartId:Types.ObjectId;
    userId:Types.ObjectId;
    foodId:Types.ObjectId;
    quantity:Number;
    restaurantId:Types.ObjectId; 
    orderDate:Date;
    orderStatus:String;
    totalPrice:Number;

};


export default orderDoc;