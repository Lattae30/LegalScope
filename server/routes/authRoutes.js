const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, updateProfile } = require('../controllers/authControllers');
const requireAuth = require('../middleware/auth');

// middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5175'
  })
);

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, updateProfile);

module.exports = router;