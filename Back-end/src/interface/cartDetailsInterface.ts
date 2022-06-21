import mongoose,{ Types } from "mongoose";


interface cartDetails extends mongoose.Document {
    foodId:Types.ObjectId;
    quantity:Number;
    description:string;
};


export default cartDetails;