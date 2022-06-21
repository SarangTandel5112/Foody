import mongoose, { Schema, model } from "mongoose";
import foodinterface from "../interface/food";

const foodSchema = new mongoose.Schema<foodinterface>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
    },
    status: {
        type: String,
        required: true
    },
})

const food = model<foodinterface>("food", foodSchema)

export default food;