const express = require("express");
const { swappableSlots, swapRequest, incomingRequests, outgoingRequests, swapResponse } = require("../controllers/swapRequestContoller");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.get("/swappable-slots", validateToken, swappableSlots);
router.post("/swap-request", validateToken, swapRequest);
router.get("/incomingRequests", validateToken, incomingRequests);
router.get("/outgoingRequests", validateToken, outgoingRequests);
router.post("/:id", validateToken, swapResponse);

module.exports = router;