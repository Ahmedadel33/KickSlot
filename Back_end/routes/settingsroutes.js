const router = require("express").Router();
const { getSettings, updateSettings } = require("../controller/settings_controller");
const adminMiddleware = require("../Middellware/adminMiddleware");

router.get("/", adminMiddleware, getSettings);
router.put("/", adminMiddleware, updateSettings);

module.exports = router;