import mongoose,{ Types } from "mongoose";


interface orderDoc extends mongoose.Document {
    cartDetailsId:[Types.ObjectId];
    userId:Types.ObjectId;
    restaurantId:Types.ObjectId;
    totalPrice:Number;
    orderDate:Date;
    orderStatus:String;
};


export default orderDoc;