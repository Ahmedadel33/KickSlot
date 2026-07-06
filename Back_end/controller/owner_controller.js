const userSchema = require("../model/User");
const { login } = require("./validate/joi_valid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ownerLogin = async (req, res) => {
  try {
    const { error, value } = login.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        msg: "Validation Error",
        errors: error.details.map((err) => err.message),
      });
    }

    const { email, password } = value;

    const user = await userSchema.findOne({ email });
     if (!user) {
      return res.status(400).json({ msg: "Owner account not found" });
    }

     if (user.role !== "owner") {
      return res.status(403).json({ msg: "Access denied. Owners only." });
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(400).json({ msg: "Invalid password" });
    }

     const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

     res.status(200).json({ 
      msg: "Owner login successful", 
      token,
      user: { name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.log("OWNER LOGIN ERROR:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { ownerLogin };