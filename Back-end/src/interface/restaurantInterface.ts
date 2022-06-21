import mongoose, { Types } from "mongoose";


interface restaurantDoc extends mongoose.Document {
    RestaurantName: String,
    OwnerName: String,
    email: String,
    password: String,
    items: [Types.ObjectId]
}


export default restaurantDoc;