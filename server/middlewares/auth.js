const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res.status(401).send("Access Denied (missing token)");
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

const verifyAdminOrUser = (req, res, next) => {
  console.log("req.user.role", req.user.role);
  console.log("req.user._id", req.user._id);
  console.log("req.params.userId", req.params.userId);
  if (req.user.role === "admin" || req.user._id === req.params.userId) {
    return next();
  }
  return res.status(401).send("Access Denied");
};

const signJwt = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "4h" });
};

module.exports = { verifyAuth, signJwt, verifyAdmin, verifyAdminOrUser };
