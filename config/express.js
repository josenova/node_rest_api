'use strict';

const express     = require('express');
const logger      = require('morgan');
const bodyParser  = require('body-parser');
const jwt         = require('jsonwebtoken');

const app = express();
const secureRoutes = express.Router();

// Use Morgan to log to console
app.use(logger('dev'));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Header Config
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  return next();
});

// Log in route
app.post('/login', require('../app/api/authentication/login'));

// Registration route
app.post('/register', require('../app/api/authentication/register'));

// Assign v1 prefix to our API and secure it.
app.use('/v1', secureRoutes);

// Token validation middleware
secureRoutes.use(function(req, res, next) {
  let token = req.body.token || req.headers['x-access-token'] || req.headers['Authorization'];

  if (token) {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        res.status(401).json({ success: false, message: 'Unauthorized access.'}); // Wrong token
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized access.' }); // No token
  }
});

// Contacts API route
secureRoutes.use('/contacts', require('../app/api/v1/contacts/contacts.routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err});
});

module.exports = app;
