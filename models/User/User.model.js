const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: [50, "Name can not be longer than 50"]
    },
    mobile: {
        type: String,
        trim: true,
        unique: true,
        minLength: 7,
        maxlength: [20, "Mobile number can not be longer than 20 "]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please add a valid email"
        ]
    },
    address: {
        street: String,
        locality: String,
        city: String,
        state: String,
        pincode: String,
        coordinatesType: {
            type: String,
            enum: ["Point"]
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    },
    status: {
        type: Number,
        default: 0
    }
}, { timestamps: true })
const User = mongoose.model("User", userSchema)
module.exports = User;