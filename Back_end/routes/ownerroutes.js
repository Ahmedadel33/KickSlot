const router = require("express").Router();
const ownermiddleware = require("../Middellware/ownerMiddleware");
const pitchController = require("../controller/pitch_Controller");
const { ownerLogin } = require("../controller/owner_controller");
const upload = require("../Middellware/uploadMiddleware"); // 🚀 ضفنا حارس رفع الصور هنا

 router.post("/login", ownerLogin);

 router.get("/get-pitches", pitchController.getPitchs);  

 router.post("/add-pitch", ownermiddleware, upload.single("pitchImage"), pitchController.addPitchs);

module.exports = router;