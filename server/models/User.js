import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    firstName: {
        type: String, 
        required: true,
        min: 3,
        max: 18
    },
    lastName: {
        type: String, 
        required: true,
        min: 3,
        max: 18
    },
    email: {
        type: String,
        required: true,
        max: 25,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max:10
    },
    amountSpent: {
        type: Number,
        default: 0
    },
    /*friends: {
        type: Array,
        default: []
    },
    groups:{
        type: Array,
        default: []
    },
    unsettledLentAmout: {
        type: Number,
        default: 0
    },
    unsettledBorrowAmout: {
        type: Number,
        default: 0
    }*/
    },
    {timestamps: true}//gives us automatic dates for when it's created or updated
)

const User = mongoose.model("User", userSchema)

export default User