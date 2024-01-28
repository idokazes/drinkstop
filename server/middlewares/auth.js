const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.log("err", err);
    res.status(401).send("Invalid Token");
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).send("Access Denied");
  }
  next();
};

const signJwt = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "4h" });
};

module.exports = { verifyAuth, signJwt, verifyAdmin };
