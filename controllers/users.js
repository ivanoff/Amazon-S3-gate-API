"use strict"
var md5 = require('md5');

var UsersModel      = require('../models/users');
var assetController = require('./assets');
var ResourcesModel  = require('../models/resources');

var ERROR = require('config').get('ERRORS');

exports.getAllUsers = function( req, res, next ){
    UsersModel.getAll( req, function( err, docs ){
        if ( err   ) return req.error(err);
        if ( !docs ) return req.error( ERROR.NO_USERS );
        res.json( docs );
    });
};

exports.getUserById = function( req, res, next ) {
    UsersModel.getById( req, req.params.userId, function( err, doc ){
        if ( err  ) return req.error(err);
        if ( !doc ) return req.error( ERROR.USER_NOT_FOUND );
        res.json( doc );
    });
};

exports.addUser = function( req, res, next ) {
    var doc    = req.body;
    doc['_id'] = req.uuid.v4();
    doc['password'] = md5( doc['password'] );

    UsersModel.validate( doc, function( err ) {
        if ( err ) { req.status=400; return next(err) }

        UsersModel.add( req, doc, function( err, result ){
            if ( err ) return req.error(err);

            doc['_usefulLink']      = '/users/'+doc['_id'];
            doc['_usefulAssets']    = '/users/'+doc['_id']+'/assets';
            doc['_usefulResources'] = '/users/'+doc['_id']+'/resources';

            ResourcesModel.initResources( req, doc, function(){} );

            res.location( '/users/'+doc['_id'] );
            res.status( 201 ).json( doc );
        });
    });
};

exports.updateUser = function( req, res, next ) {
    UsersModel.get( req, function( err, doc ){
        if ( err  ) return req.error(err);
        if ( !doc ) return req.error( ERROR.USER_NOT_FOUND );

        //luck of nested
        doc = req._.extend( doc, req.body );

        UsersModel.validate( doc, function( err ) {
            if ( err ) { req.status=400; return next(err) }

            UsersModel.update( req, doc, function( err, result, next ){
                if ( err ) return req.error(err);
                res.json( { ok : 1, _id: doc._id } );
            });
        });

    });
};

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
