const dotenv = require('dotenv');
dotenv.config(); // THIS MUST BE FIRST!

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// Now require passport config (after dotenv.config())
const passport = require('./config/passport');

// 3. Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const session = require('express-session');

// 4. Create app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Session middleware (required for Passport)
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.use('/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

console.log('GOOGLE_CLIENT_ID in passport.js:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET in passport.js:', process.env.GOOGLE_CLIENT_SECRET); 