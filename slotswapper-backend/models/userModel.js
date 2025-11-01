const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter the username"]
    },
    email: {
        type: String,
        required: [true, "Enter the user email address"]
    },
    password: {
        type: String,
        required: [true, "Enter the user password"]
    }
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);