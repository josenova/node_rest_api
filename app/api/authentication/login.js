'use strict';

const express = require('express');
const router  = express.Router();

const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcrypt');
const User    = require('mongoose').model('User');

// Log in
router.use(function(req, res, next) {

  var failure = 'Authentication failed. Email and password do not match.';

  // Check parameters exist
  if (req.body.email && req.body.password) {

    // Find user
    User.findOne({
      email: req.body.email
    })
    .exec()
    .then(user => {

      if (user) {
        // Match passwords
        if(bcrypt.compareSync(req.body.password, user.password)) {

          var token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' }); // Create token
          res.status(200).json({ success: true, token: token }); // Return token

        } else {
          res.status(403).json({ success: false, message: failure }); // Password dont match
        }

      } else {
        res.status(403).json({ success: false, message: failure }); // User not found
      }

    }).catch(err => next(err));

  } else {
    res.status(400).json({ success: false, message: failure }); // Parameters missing
  }

});

module.exports = router;
