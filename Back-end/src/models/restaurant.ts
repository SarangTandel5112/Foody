import mongoose, { Schema } from "mongoose";
import restaurantDoc from "../interface/restaurantInterface";

const restaurantSchema = new mongoose.Schema({

    RestaurantName: { type: String, required: true },
    OwnerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    items: [{
        type: Schema.Types.ObjectId,
        ref:"food"
    }]
});

const Restaurant = mongoose.model<restaurantDoc>("Restaurant", restaurantSchema);

export default Restaurant;
