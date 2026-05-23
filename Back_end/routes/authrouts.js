const controller = require("../controller/auth_controller");
const router = require("express").Router();
const authcontroller = require("../Middellware/authController");  

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);  
router.get("/logout", controller.logout);

module.exports = router;