const rateLimit = require('express-rate-limit');

const buildMessage = (message) => ({ message });

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: buildMessage('Too many requests, please try again later.'),
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  message: buildMessage('Too many authentication attempts, please try again in 15 minutes.'),
});

module.exports = {
  apiLimiter,
  authLimiter,
};