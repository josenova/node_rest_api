'use strict';

const express = require('express');
const router  = express.Router();

var contacts  = require('./contacts.controller');

// Index & Create
router.route('/').get(contacts.index).post(contacts.create);

module.exports = router;
