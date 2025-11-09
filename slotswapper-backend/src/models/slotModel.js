const mongoose = require("mongoose");

const slotSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, 
    title:{
        type: String,
        required: [true, "Enter the title of the slot"],
    },
    startTime:{
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    status:{
        type: String,
        enum: ["BUSY", "SWAP_PENDING", "SWAPPABLE"],
        default: "BUSY",
        required: true
    },
},{
    timestamps: true,
})

module.exports = mongoose.model("Slot", slotSchema);