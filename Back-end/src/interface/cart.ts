import mongoose,{ Types } from "mongoose";


interface cartDoc extends mongoose.Document {
    foodId:[Types.ObjectId];
    
}


export default cartDoc;