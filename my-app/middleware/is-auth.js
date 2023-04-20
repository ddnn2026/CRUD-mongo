const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).send("A token required");
  }

  try {
    const decode = jwt.verify(token.replace("Bearer ", ""), "david");
    req.user = decode;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }

  return next();
};

module.exports = verifyToken;
