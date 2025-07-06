const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Start Google OAuth login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/login' }),
  (req, res) => {
    if (!req.user) {
      return res.redirect('http://localhost:3000/login');
    }
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

// Logout user
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Local signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name: username, email, password: hashedPassword });
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(201).json({ message: 'User created successfully.', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Local login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(404).json({ message: 'No details found or invalid user input.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'No details found or invalid user input.' });
    }
    res.status(200).json({ message: 'Login successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
