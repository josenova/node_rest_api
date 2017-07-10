'use strict';

const firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBTMgvadQmQRzplA_TIreRDQwYLPT2BBSQ",
    authDomain: "strv-e7543.firebaseapp.com",
    databaseURL: "https://strv-e7543.firebaseio.com",
    storageBucket: "strv-e7543.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

module.exports = database;
