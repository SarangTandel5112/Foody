import mongoose from "mongoose";


interface restaurantDoc extends mongoose.Document {
    RestaurantName: String,
    OwnerName: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date
}


export default restaurantDoc;