'use strict';

// Environment Constants
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.SECRET = 'secretexample';
process.env.PORT = 9999;

// Load Mongoose
const mongoose = require('./config/mongoose');

// Load Firebase
const firebase = require('./config/firebase');

// Load Models
const User = require('./app/models/user');

// Load Express
const app = require('./config/express');

// Start server
const port = process.env.PORT;
const server = app.listen(port, '0.0.0.0', () => {
  console.log('API listening on port 9999');
});
