const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  // Verify the token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Attach decoded user info to the request object
    req.user = decoded; // This can include any data you encoded in the token, e.g., userId, username
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
