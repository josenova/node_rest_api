'use strict';

const mongoose = require('mongoose');

// Use ES6 native Promises
mongoose.Promise = global.Promise;

// Connect to DB
mongoose.connect('mongodb://admin:example123@cluster0-shard-00-00-sejs4.mongodb.net:27017,cluster0-shard-00-01-sejs4.mongodb.net:27017,cluster0-shard-00-02-sejs4.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

// Catch connection error
mongoose.connection.on('error', err => {
  debug('Connection error:', err);
});

module.exports = mongoose;
