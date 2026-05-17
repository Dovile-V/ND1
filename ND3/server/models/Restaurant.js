import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
     city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ""
    },
    cuisine: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    dish: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "restoranas1.jpg"
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Restaurant", restaurantSchema);