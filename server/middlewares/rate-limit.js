const { rateLimit } = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 2000,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

module.exports = { rateLimiter };
