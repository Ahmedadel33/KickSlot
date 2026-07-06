const userSchema = require("../model/User");
const { register, login } = require("./validate/joi_valid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  console.log("REGISTER CALLED", req.body); 

  try {
    const { error, value } = register.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return res.status(400).json({
        msg: "Validation Error",
        errors: error.details.map((err) => err.message),    
      });
    }
    
    const { name, email, password, phone, role } = req.body; 

    const existUser = await userSchema.findOne({ email });
    if (existUser) return res.status(400).json({ msg: "User already exist" });
    
    const hashPassword = await bcrypt.hash(password, 10);
    await userSchema.create({
      name,
      email,
      password: hashPassword,
      phone,
      role: role || "user" // لو مفيش role مبعوت، السيستم هيخليه لاعب عادي user تلقائياً
    });
    res.status(201).json({ msg: "User Created" });
  } catch (error) {
    console.log("REGISTER ERROR:", error.message);
    res.status(500).json({ msg: "Server error", detail: error.message });  
  }
};

const loginUser = async (req, res) => {
  try {
    const { error, value } = login.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        errors: error.details.map((err) => err.message),
      });
    }

    const { email, password } = value;
    console.log("2. email:", email);

    const userexsit = await userSchema.findOne({ email });
    console.log("3. user found:", userexsit);

    if (!userexsit) {
      return res.status(400).json({ msg: "Please create an account first" });
    }

    const comparePass = await bcrypt.compare(password, userexsit.password);
    console.log("4. password match:", comparePass);

    if (!comparePass) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { 
        id: userexsit._id,
        role: userexsit.role 
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    console.log("5. token created for role:", userexsit.role);

    res.status(200).json({ 
      msg: "Login successful", 
      token,
      user: {
        name: userexsit.name,
        email: userexsit.email,
        role: userexsit.role
      }
    });
  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { registerUser, loginUser, logout };