import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    dish: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    comment: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Suggestion", suggestionSchema);