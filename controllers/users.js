"use strict"

var UsersModel      = require('../models/users');
var assetController = require('./assets');
var ResourcesModel  = require('../models/resources');

var ERROR = require('config').get('ERRORS');

exports.getAllUsers = function( req, res, next ){
    UsersModel.getAll( req, function( err, docs ){
        if ( err   ) { req.error( 500, err ); return next(err) }
        if ( !docs ) { req.error( 404, ERROR.NO_USERS ); return next() }   // No users found
        res.json( docs );
    });
};

exports.getUserById = function( req, res, next ) {
    UsersModel.get( req, function( err, doc ){
        if ( err  ) { req.error( 500, err ); return next(err) }
        if ( !doc ) { req.error( 404, ERROR.USER_NOT_FOUND ); return next() }   // User not found
        res.json( doc );
    });
};

exports.addUser = function( req, res, next ) {
    var doc    = req.body;
    doc['_id'] = req.uuid.v4();

    UsersModel.validate( doc, function( err ) {
        if ( err ) { req.error( 400, err ); return next(err) }

        UsersModel.add( req, doc, function( err, result, next ){
            if ( err ) { req.error( 500, err ); return next(err) }

            ResourcesModel.initResources( req, doc, function(){} );

            res.location( '/users/'+doc['_id'] );
            res.status( 201 );
            res.json( doc );
        });
    });
};

exports.updateUser = function( req, res, next ) {
    UsersModel.get( req, function( err, doc ){
        if ( err  ) { req.error( 500, err ); return next(err) }
        if ( !doc ) { req.error( 404, ERROR.USER_NOT_FOUND ); return next() }  // User not found

        //luck of nested
        doc = req._.extend( doc, req.body );

        UsersModel.validate( doc, function( err ) {
            if ( err ) { req.error( 400, err ); return next(err) }

            UsersModel.update( req, doc, function( err, result, next ){
                if ( err ) { req.error( 500, err ); return next(err) }
                res.json( { ok : 1, _id: doc._id } );
            });
        });

    });
};

exports.removeUser = function( req, res, next ) {
    UsersModel.remove( req, function( err, doc ){
        if ( err  ) { req.error( 500, err ); return next(err) }
        if ( !doc ) { req.error( 404, ERROR.USER_NOT_FOUND ); return next() } // User not found
        assetController.removeAllUsersAssets( req, function( req, res ){
            if ( err ) { req.error( 500, err ); return next(err) }
        } );
        res.json( { ok : 1, _id: req.params.userId } );
    });
};
