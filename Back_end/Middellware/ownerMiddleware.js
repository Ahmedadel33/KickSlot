const jwt = require("jsonwebtoken");

const ownerMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("DECODED TOKEN:", decoded);

     if (decoded.role !== "owner") {
      return res.status(403).json({ msg: "Access denied. Owners only." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

 module.exports = ownerMiddleware;