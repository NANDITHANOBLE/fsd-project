const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// 1. Load environment variables
dotenv.config();

// 2. Import passport config BEFORE routes
const passportConfig = require('./config/passport');

// 3. Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const session = require('express-session');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// @route   GET /auth/google
// @desc    Start Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET /auth/google/callback
// @desc    Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/' }), (req, res) => {
  // Generate JWT
  const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  // Send token as cookie or in response (for now, send as JSON)
  res.redirect(`http://localhost:3000?token=${token}`); // Redirect to frontend with token
});

// @route   GET /auth/logout
// @desc    Logout user
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router; 