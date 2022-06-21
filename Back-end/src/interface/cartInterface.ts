import mongoose,{ Types } from "mongoose";


interface cartDoc extends mongoose.Document {
    foodId:[Types.ObjectId];
    userId:Types.ObjectId;
    totalPrice:Number;
};


export default cartDoc;