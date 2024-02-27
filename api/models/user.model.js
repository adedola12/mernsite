import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 4
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User;