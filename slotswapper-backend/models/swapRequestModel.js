const mongoose = require("mongoose");

const swapRequestSchema = mongoose.Schema({
    requesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    offeredSlotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot",
        required: true
    },
    requestedSlotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot",
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "REJECTED"],
        default: "PENDING"
    },
    message: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Swap", swapRequestSchema);