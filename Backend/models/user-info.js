import mongoose from "mongoose";

const userInfoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String, 
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const UserData = mongoose.model("usersData", userInfoSchema);