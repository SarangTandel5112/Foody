import mongoose,{ Types } from "mongoose";


interface cartDoc extends mongoose.Document {
    cartDetailsId:[Types.ObjectId];
    userId:Types.ObjectId;
    totalPrice:Number;

};


export default cartDoc;