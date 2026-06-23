const router = require("express").Router();
const { adminLogin } = require("../controller/admin_controller");
const adminMiddleware = require("../Middellware/adminMiddleware");
const pitchController = require("../controller/pitch_Controller");

 router.post("/login", adminLogin);
router.get("/get-pitches", pitchController.getPitchs); // شيلنا الـ adminMiddleware عشان الكل يشوف الملاعب

 router.post("/add-pitch", adminMiddleware, pitchController.addPitchs);

module.exports = router;