"use strict"

var AssetsModel = require('../models/assets');

exports.getAllAssets = function( req, res, next ){
    AssetsModel.getAll( req, function( err, docs ){
        if ( err   ) { req.error( 500, err ); return next(err) }
        if ( !docs ) { req.error( 404, 122 ); return next() }
        res.json( docs );
    });
};

exports.getAssetById = function( req, res, next ) {
    AssetsModel.get( req, function( err, docs ){
        if ( err   ) { req.error( 500, err ); return next(err) }
        if ( !docs ) { req.error( 404, 121 ); return next() } // Asset not found
        res.json( docs );
    });
};

exports.addAsset = function( req, res, next ) {
    if( !req.body.first_name ) { req.error( 500, 101 ); return next(); }
    if( !req.body.first_name.match(/^[\w\ _`\-]+$/i) ) { req.error( 500, 111 ); return next(); }

    if( !req.body.last_name ) { req.error( 500, 102 ); return next(); }
    if( !req.body.last_name.match(/^[\w\ _`\-]+$/i) ) { req.error( 500, 112 ); return next(); }

    if( !req.body.email ) { req.error( 500, 103 ); return next(); }
    if( !req.body.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i) ) { req.error( 500, 113 ); return next(); }

    var id = req.uuid.v4()
    var data = {
        _id: id,
        name: {
            first : req.body.first_name,
            last  : req.body.last_name,
        },
        email: req.body.email,
        metadata: req.body.metadata? req.body.metadata : {},
    }

    AssetsModel.add( req, data, function( err, result, next ){
        if ( err ) { req.error( 500, err ); return next(err) }
        res.json( { ok : 1, _id: id } );
    });
};

exports.updateAsset = function( req, res, next ) {
    AssetsModel.get( req, function( err, docs ){
        if ( err   ) { req.error( 500, err ); return next(err) }
        if ( !docs ) { req.error( 404, 121 ); return next() }  // Asset not found

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

        AssetsModel.update( req, docs, function( err, result, next ){
            if ( err ) { req.error( 500, err ); return next(err) }
            res.json( { ok : 1, _id: docs._id } );
        });
    });
};

exports.deleteAsset = function( req, res, next ) {
    AssetsModel.remove( req, function( err, docs ){
        if ( err   ) { req.error( 500, err ); return next(err) }
        if ( !docs ) { req.error( 404, 121 ); return next() } // Asset not found
        res.json( { ok : 1, _id: req.params.id } );
    });
};
