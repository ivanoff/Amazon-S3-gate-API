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
    UsersModel.get( req, function( err, doc ){
        if ( err  ) { req.error( 500, err ); return next(err) }
        if ( !doc ) { req.error( 404, 121 ); return next() }   // User not found
        res.json( doc );
    });
};

exports.addUser = function( req, res, next ) {
    var doc    = req.body;
    doc['_id'] = req.uuid.v4();

    UsersModel.validate( doc, function( err ) {
        if ( err ) { req.error( 500, err ); return next(err) }

        UsersModel.add( req, doc, function( err, result, next ){
            if ( err ) { req.error( 500, err ); return next(err) }
            res.json( { ok : 1, _id: doc['_id'] } );
        });
    });
};

exports.updateUser = function( req, res, next ) {
    UsersModel.get( req, function( err, doc ){
        if ( err  ) { req.error( 500, err ); return next(err) }
        if ( !doc ) { req.error( 404, 121 ); return next() }  // User not found

        //luck of nested
        doc = req._.extend( doc, req.body );

        UsersModel.validate( doc, function( err ) {
            if ( err ) { req.error( 500, err ); return next(err) }

            UsersModel.update( req, doc, function( err, result, next ){
                if ( err ) { req.error( 500, err ); return next(err) }
                res.json( { ok : 1, _id: doc._id } );
            });
        });

    });
};

exports.deleteUser = function( req, res, next ) {
    UsersModel.remove( req, function( err, doc ){
        if ( err  ) { req.error( 500, err ); return next(err) }
        if ( !doc ) { req.error( 404, 121 ); return next() } // User not found
        res.json( { ok : 1, _id: req.params.userId } );
    });
};
