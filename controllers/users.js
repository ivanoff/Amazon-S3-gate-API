"use strict"
var md5  = require('md5');
var uuid = require('node-uuid' );
var _    = require('underscore');

var UsersModel      = require('../models/users');
var assetController = require('./assets');
var ResourcesModel  = require('../models/resources');

var ERROR = require('config').get('ERRORS');

/**
 * Get list of all users
 */
exports.getAllUsers = function( req, res, next ){
    UsersModel.getAll( req, function( err, docs ){
        if ( err   ) return req.error(err);
        if ( !docs ) return req.error( ERROR.NO_USERS );
        res.json( docs );
    });
};

/**
 * Get user by userId
 * @param {uuid} req.params.userId - Id of the user
 */
exports.getUserById = function( req, res, next ) {
    UsersModel.getById( req, req.params.userId, function( err, doc ){
        if ( err  ) return req.error(err);
        if ( !doc ) return req.error( ERROR.USER_NOT_FOUND );
        res.json( doc );
    });
};

/**
 * Register new user
 * @param {string} req.body.login - Login of the user, required
 * @param {string} req.body.password - Password of the user, required
 * @param {string} req.body.type - Type of the user
 * @param {string} req.body.name.first - User's first name, required
 * @param {string} req.body.name.last - User's last name
 * @param {string} req.body.email - User's e-mail
 */
exports.addUser = function( req, res, next ) {
    var doc    = req.body;
    doc._id = uuid.v4();
    doc.password = md5( doc['password'] );

    UsersModel.validate( doc, function( err ) {
        if ( err ) return req.error(err);

        UsersModel.add( req, doc, function( err, result ){
            if ( err ) return req.error(err);

            doc._links = {
                self      : { href : '/users/'+doc._id },
            };

            ResourcesModel.initResources( req, doc, function(){} );

            res.location( '/users/'+doc._id );
            res.status( 201 ).json( doc );
        });
    });
};

/**
 * Update user's information
 * @param {string} req.params.userId - Id of the user, required
 * @param {string} req.body.login - Login of the user
 * @param {string} req.body.password - Password of the user
 * @param {string} req.body.type - Type of the user
 * @param {string} req.body.name.first - User's first name
 * @param {string} req.body.name.last - User's last name
 * @param {string} req.body.email - User's e-mail
 */
exports.updateUser = function( req, res, next ) {
    UsersModel.getById( req, req.params.userId, function( err, doc ){
        if ( err  ) return req.error(err);
        if ( !doc ) return req.error( ERROR.USER_NOT_FOUND );

        doc = _.extend( doc, req.body );
        if( req.body.password ) doc.password = md5( doc.password );

        UsersModel.validate( doc, function( err ) {
            if ( err ) { req.status=400; return next(err) }

            UsersModel.update( req, doc, function( err, result, next ){
                if ( err ) return req.error(err);
                res.status( 201 ).json( doc );
            });
        });

    });
};

/**
 * Remove user from database
 * @param {string} req.params.userId - Id of the user, required
 */
exports.removeUser = function( req, res, next ) {
    UsersModel.remove( req, function( err, doc ){
        if ( err  ) return req.error(err);
        if ( !doc ) return req.error( ERROR.USER_NOT_FOUND );
        assetController.removeAllUsersAssets( req, res, function( req, res ){
            if ( err ) return req.error(err);
        } );
        res.json( { ok : 1, _id: req.params.userId } );
    });
};
