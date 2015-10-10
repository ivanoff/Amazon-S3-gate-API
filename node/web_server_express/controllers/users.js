"use strict"

var UsersModel = require('../models/users');

exports.getAllUsers = function( req, res, next ){
    UsersModel.getAll( req, function( err, docs ){
        if ( err   ) { req.error( 500, err ); return next(err) }
        if ( !docs ) { req.error( 404, 122 ); return next() }   // No users found
        res.json( docs );
    });
};

exports.getUserById = function( req, res, next ) {
    UsersModel.get( req, function( err, docs ){
        if ( err   ) { req.error( 500, err ); return next(err) }
        if ( !docs ) { req.error( 404, 121 ); return next() }   // User not found
        res.json( docs );
    });
};

exports.addUser = function( req, res, next ) {
    var data  = req.body;
    data['_id'] = req.uuid.v4();

    UsersModel.validate( data, function( err ) {
        if ( err ) { req.error( 500, err ); return next(err) }

        UsersModel.add( req, data, function( err, result, next ){
            if ( err ) { req.error( 500, err ); return next(err) }
            res.json( { ok : 1, _id: data['_id'] } );
        });
    });
};

exports.updateUser = function( req, res, next ) {
    UsersModel.get( req, function( err, docs ){
        if ( err   ) { req.error( 500, err ); return next(err) }
        if ( !docs ) { req.error( 404, 121 ); return next() }  // User not found

        if( req.body.first_name ) {
            if( !req.body.first_name.match(/^[\w\ _`\-]+$/i) ) { req.error( 500, 111 ); return next(); }
            else { docs.name.first = req.body.first_name };
        }
        if( req.body.last_name ) {
            if( !req.body.last_name.match(/^[\w\ _`\-]+$/i) ) { req.error( 500, 112 ); return next(); }
            else { docs.name.last = req.body.last_name };
        }
        if( req.body.email ) {
            if( !req.body.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i) ) { req.error( 500, 113 ); return next(); }
            else { docs.email = req.body.email };
        }
        if ( req.body.metadata ) docs.metadata = req.body.metadata;

        UsersModel.update( req, docs, function( err, result, next ){
            if ( err ) { req.error( 500, err ); return next(err) }
            res.json( { ok : 1, _id: docs._id } );
        });
    });
};

exports.deleteUser = function( req, res, next ) {
    UsersModel.remove( req, function( err, docs ){
        if ( err   ) { req.error( 500, err ); return next(err) }
        if ( !docs ) { req.error( 404, 121 ); return next() } // User not found
        res.json( { ok : 1, _id: req.params.id } );
    });
};
