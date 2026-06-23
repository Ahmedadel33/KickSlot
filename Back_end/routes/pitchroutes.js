const router = require("express").Router();
const { addPitchs, getPitchs, getAdminPitches, updatePitch, deletePitch } = require("../controller/pitch_Controller");
const adminMiddleware = require("../Middellware/adminMiddleware");

router.get("/getpitch", getPitchs);
router.post("/addpitch", adminMiddleware, addPitchs);
router.get("/adminpitch", adminMiddleware, getAdminPitches);
router.put("/updatepitch/:id", adminMiddleware, updatePitch);
router.delete("/deletepitch/:id", adminMiddleware, deletePitch);

module.exports = router;