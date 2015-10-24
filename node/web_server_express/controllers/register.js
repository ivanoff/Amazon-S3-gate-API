"use strict"
var UsersController = require('./users');

exports.registerGuest = function( req, res, next ) {
    req.body.type = 'guest';
    UsersController.addUser( req, res, next );
};

