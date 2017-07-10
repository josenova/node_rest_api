'use strict';

const firebase = require('../../../../config/firebase');

// Index
exports.index = function(req, res, next) {

  var contacts = [];

  firebase.ref(`users/${req.decoded._doc._id}/contacts`).once('value').then(snapshot => {

    snapshot.forEach(userContact => {
      contacts.push(userContact.val().name); // build contacts array
    });

    res.status(200).json({ contacts: contacts });
  });

};


// Create
exports.create = function(req, res, next) {

  if (req.body.name) {

    firebase.ref(`users/${req.decoded._doc._id}/contacts`).push({
      name: req.body.name
    }, err => {

      if (err) {
        next(err);
      } else {
        res.status(201).json({ success: true });
      }

    });
  } else {
    res.status(400).json({ success: false, message: 'No contact name provided.'});
  }

};
