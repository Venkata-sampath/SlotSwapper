const asyncHandler = require("express-async-handler");
const Slot = require("../models/slotModel");
const Swap = require("../models/swapRequestModel");
const User = require("../models/userModel");

//@desc Get all swappable-slots
//@api GET /api/swaps/swappable-slots
//@access private
const swappableSlots = asyncHandler (async (req, res)=>{
    const slots = await Slot.find({
        status: "SWAPPABLE", 
        user_id: { $ne: req.user.id },
    })
    .populate("user_id", "username email")
    .select("title startTime endTime status user_id")
    .sort({startTime: 1});
    res.json(slots);
});

//@desc Swap request
//@api POST /api/swaps/swap-request
//@access private
const swapRequest = asyncHandler (async(req, res)=>{
    const {offeredSlotId, requestedSlotId} = req.body;
    if(!offeredSlotId || !requestedSlotId){
        res.status(400);
        throw new Error("Please provide slot details");
    }

    const offeredSlot = await Slot.findById(offeredSlotId);
    const requestedSlot = await Slot.findById(requestedSlotId);

    if(!offeredSlot || !requestedSlot && offeredSlot.status !== "SWAPPABLE" || requestedSlot.status !== "SWAPPABLE"){
        res.status(404);
        throw new Error("The Slot is not found or slot is not swappable");
    }

    const swap = await Swap.create({
        ownerId : requestedSlot.user_id,
        requesterId: offeredSlot.user_id,
        requestedSlotId, offeredSlotId
    });

    offeredSlot.status = "SWAP_PENDING";
    requestedSlot.status = "SWAP_PENDING";

    await offeredSlot.save();
    await requestedSlot.save()

    res.status(201).json(swap);
});

//@desc Get all incoming swap requests
//@api GET /api/swaps/incomingRequests
//@access private
const incomingRequests = asyncHandler (async(req, res)=>{
    const incomingRequests = await Swap.find({
        status: "PENDING",
        ownerId : { $eq: req.user.id},
    })
    .populate("requestedSlotId", "title startTime endTime")
    .populate("requesterId", "username email")
    .populate("offeredSlotId", "title startTime endTime")
    
    res.json(incomingRequests);
});

//@desc Get all outgoing swap requests
//@api GET /api/swaps/outgoingRequests
//@access private
const outgoingRequests = asyncHandler (async(req, res)=>{
    const outgoingRequests = await Swap.find({
        status: "PENDING",
        requesterId : { $eq: req.user.id},
    })
    .populate("requestedSlotId", "title startTime endTime")
    .populate("ownerId", "username email")
    .populate("offeredSlotId", "title startTime endTime")
    
    res.json(outgoingRequests);
});

//@desc Respond to swap request
//@api POST /api/swaps/:id
//@access private
const swapResponse = asyncHandler ( async (req, res)=>{
    const {acceptance} = req.body;
    if(typeof acceptance !== "boolean"){
        res.status(400);
        throw new Error("Invalid Input the input must be true or false!");
    }

    const swapRequest = await Swap.findById(req.params.id);
    if(!swapRequest){
        res.status(404);
        throw new Error("Swap request not found")
    }

    const offeredSlot = await Slot.findById(swapRequest.offeredSlotId);
    const requestedSlot = await Slot.findById(swapRequest.requestedSlotId);
    if(!offeredSlot || !requestedSlot){
        res.status(404);
        throw new Error("Slot not found")
    }

    if(acceptance){
        swapRequest.status = "ACCEPTED";
        
        const tempId = offeredSlot.user_id;
        offeredSlot.user_id = requestedSlot.user_id;
        requestedSlot.user_id = tempId;

        offeredSlot.status = "BUSY"
        requestedSlot.status = "BUSY"
    }else{
        swapRequest.status = "REJECTED";

        offeredSlot.status = "SWAPPABLE"
        requestedSlot.status = "SWAPPABLE"
    }

    await swapRequest.save()
    await offeredSlot.save();
    await requestedSlot.save()

    res.status(200).json({message: `Swap ${acceptance ? "accepted": "rejected"} successfully`}, swapRequest);
})

module.exports = {swapRequest, incomingRequests, outgoingRequests, swappableSlots, swapResponse};