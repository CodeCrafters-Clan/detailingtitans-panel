const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // console.log(authHeader);
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  // here we usually check for access token secret but now we are decoding here refresh_token
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    // console.log(decoded);
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

module.exports = verifyJWT;
