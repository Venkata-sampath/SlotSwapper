const express = require("express");
const router = express.Router();
const {getSlots, createSlot, getSlot, updateSlot, deleteSlot} = require("../controllers/slotController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken);
router.route("/").get(getSlots).post(createSlot);
router.route("/:id").get(getSlot).put(updateSlot).delete(deleteSlot);



module.exports = router;