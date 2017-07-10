'use strict';

const express = require('express');
const router  = express.Router();

const bcrypt  = require('bcrypt');
const User    = require('mongoose').model('User');

// Register
router.use(function(req, res, next) {

  if (req.body.email && req.body.password) {

    // User instance
    var user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    });

    // Save user
    user.save(err => {

      if (err) {
        next(err);
      } else {
        res.status(201).json({ success: true });
      }

    });

  } else {
    res.status(400).json({ success: false, message: 'Failed to register user.'});
  }

});

module.exports = router;
