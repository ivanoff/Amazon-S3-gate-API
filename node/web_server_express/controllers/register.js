"use strict"
var UsersController = require('./users');

/**
 * Register new guest user
 * @param {string} req.body.login - Login of the user, required
 * @param {string} req.body.password - Password of the user, required
 * @param {string} req.body.name.first - User's first name, required
 * @param {string} req.body.name.last - User's last name
 * @param {string} req.body.email - User's e-mail
 */
exports.registerGuest = function( req, res, next ) {
    req.body.type = 'guest';
    UsersController.addUser( req, res, next );
};

