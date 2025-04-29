const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

const rateLimiter = require('express-rate-limit');

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

const { register, login, loginPlayer, registerPlayer, updateAdmin } = require('../controllers/auth');
router.post('/register', apiLimiter, register).post('/registerPlayer', apiLimiter, registerPlayer);
router.post('/login', apiLimiter, login).post('/loginPlayer', apiLimiter, loginPlayer);
router.patch('/updateAdmin', authenticateUser, updateAdmin);
module.exports = router;
