const asyncHandler = require("express-async-handler");
const Slot = require("../models/slotModel");

//@desc Get all slots
//@api GET /api/slots
//@access private
const getSlots = asyncHandler (async (req, res)=>{
    const slots = await Slot.find({user_id: req.user.id});
    res.status(200).json(slots);
});

//@desc Create a slot
//@api POST /api/slots
//@access private
const createSlot = asyncHandler (async (req, res)=>{
    console.log("the request body: ", req.body);
    const {title, startTime, endTime, status} = req.body;
    if(!title || !startTime || !endTime || !status){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const slot = await Slot.create({
        title, startTime, endTime, status,
        user_id: req.user.id
    });
    res.status(201).json(slot);
});

//@desc Get a slot by id
//@api GET /api/slots/:id
//@access private
const getSlot = asyncHandler (async (req, res)=>{
    const slot = await Slot.findById(req.params.id);
    if(!slot){
        res.status(404);
        throw new Error("Slot not found!");
    }

    if(slot.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Users dont have permission to check other user Slots");
    }

    res.status(200).json(slot);
});

//@desc Update the slot
//@api PUT /api/slots/:id
//@access private
const updateSlot = asyncHandler (async (req, res)=>{
    const slot = await Slot.findById(req.params.id);
    if(!slot){
        res.status(404);
        throw new Error("Slot not found!");
    }

    if(slot.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Users dont have permission to update other user Slots");
    }

    const updatedSlot = await Slot.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true, runValidators: true}
    )
    res.status(200).json(updatedSlot);
});

//@desc Delete the slot
//@api DELETE /api/slots/:id
//@access private
const deleteSlot = asyncHandler (async (req, res)=>{
    const slot = await Slot.findById(req.params.id);
    if(!slot){
        res.status(404);
        throw new Error("Slot not found!");
    }

    if(slot.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Users dont have permission to delete other user Slots");
    }

    await slot.deleteOne();
    res.status(200).json({message: `Delete the slot with id: ${req.params.id}`, slot });
});

module.exports = {getSlots, createSlot, getSlot, updateSlot, deleteSlot};