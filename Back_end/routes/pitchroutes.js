const router = require("express").Router();
const multer = require("multer"); 
const {getById, addPitchs, getPitchs, getAdminPitches, updatePitch, deletePitch } = require("../controller/pitch_Controller");
const ownerMiddleware = require("../Middellware/ownerMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  }
});

const upload = multer({ storage: storage });
router.get("/getpitch", getPitchs);
router.get("/getpitch/:id", getById);
        
router.post("/add-pitch", ownerMiddleware, upload.single("pitchImage"), addPitchs);
router.get("/adminpitch", ownerMiddleware, getAdminPitches);
router.put("/updatepitch/:id", ownerMiddleware, updatePitch);
router.delete("/deletepitch/:id", ownerMiddleware, deletePitch);


module.exports = router;  