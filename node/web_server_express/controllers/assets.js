"use strict"

var AssetsModel = require('../models/assets');

var ERROR = require('config').get('ERRORS');

exports.getRootAssets = function( req, res, next ){
    AssetsModel.getRoot( req, function( err, docs ){
        if ( err   ) { req.error( 500, err ); return next(err) }
        if ( !docs ) { req.error( 404, ERROR.NO_ASSETS ); return next() }
        res.json( docs );
    });
};

exports.getAssetById = function( req, res, next ) {
    AssetsModel.get( req, function( err, doc ){
        if ( err  ) { req.error( 500, err ); return next(err) }
        if ( !doc ) { req.error( 404, ERROR.ASSET_NOT_FOUND ); return next() }
        if ( doc.type != 'folder' ) {
            res.json( doc );
        } else {
            AssetsModel.getFolderContent( req, doc.path + '/' + doc.name, function( err, doc ){
                if ( err  ) { req.error( 500, err ); return next(err) }
                if ( !doc ) { req.error( 404, ERROR.ASSET_NOT_FOUND ); return next() }
                res.json( doc );
            });
        }
    });
};

exports.addAsset = function( req, res, next ) {
    var doc    = req.body;
    doc['_id'] = req.uuid.v4();
    doc['userId'] = req.params.userId;
    if( !req.params.path ) { doc['path'] = '' };

    AssetsModel.validate( doc, function( err ) {
        if ( err ) { req.error( 400, err ); return next(err) }

        AssetsModel.add( req, doc, function( err, result, next ){
            if ( err ) { req.error( 500, err ); return next(err) }
            res.location( '/users/'+doc['userId']+'/assets/'+doc['_id'] );
            res.status( 201 );
            res.json( doc );
        });
    });
};

exports.addAssetToFolder = function( req, res, next ) {
    var doc    = req.body;
    doc['_id'] = req.uuid.v4();
    doc['userId'] = req.params.userId;
    if( !req.params.path ) { doc['path'] = '' };

//Promisesis?
    if( req.params.assetId ) {
        AssetsModel.get( req, function( err, docFolder ){
            if ( err ) { req.error( 500, err ); return next(err) }
            if ( !docFolder ) { req.error( 404, ERROR.ASSET_NOT_FOUND ); return next() }
            if ( docFolder.type != 'folder' ) 
                        { req.error( 404, ERROR.NOT_A_FOLDER ); return next() }
            doc['path'] = docFolder.path + '/' + docFolder.name

            AssetsModel.validate( doc, function( err ) {
                if ( err ) { req.error( 400, err ); return next(err) }
        
                AssetsModel.add( req, doc, function( err, result, next ){
                    if ( err ) { req.error( 500, err ); return next(err) }

                    doc['_usefulLink']      = '/users/'+doc['userId']+'/assets/'+doc['_id'];

                    res.location( '/users/'+doc['userId']+'/assets/'+doc['_id'] );
                    res.status( 201 );
                    res.json( doc );
                });
            });
        })
    }

};

exports.updateAsset = function( req, res, next ) {
    AssetsModel.get( req, function( err, doc ){
        if ( err  ) { req.error( 500, err ); return next(err) }
        if ( !doc ) { req.error( 404, ERROR.ASSET_NOT_FOUND ); return next() }

        doc = req._.extend( doc, req.body );

        AssetsModel.validate( doc, function( err ) {
            if ( err ) { req.error( 400, err ); return next(err) }

            AssetsModel.update( req, doc, function( err, result, next ){
                if ( err ) { req.error( 500, err ); return next(err) }
                res.json( { ok : 1, _id: doc._id } );
            });
        });

    });
};

exports.search = function( req, res, next ){
    AssetsModel.search( req, function( err, docs ){
        if ( err   ) { req.error( 500, err ); return next(err) }
        if ( !docs ) { req.error( 404, ERROR.NO_ASSETS ); return next() }
        res.json( docs );
    });
};

exports.download = function( req, res, next ) {
    AssetsModel.get( req, function( err, doc ){
        if ( err  ) { req.error( 500, err ); return next(err) }
        if ( !doc ) { req.error( 404, ERROR.ASSET_NOT_FOUND ); return next() }
        if ( doc.type != 'folder' ) {
            req.aws.download( { fileId: doc['_id'] }, function(){} );
            res.json( doc );
        } else {
            next( 'Folder type is not downloadable. But we can zip it. Later. If you want.' );
        }
    });
};

exports.removeAsset = function( req, res, next ) {
    AssetsModel.remove( req, function( err, doc ){
        if ( err  ) { req.error( 500, err ); return next(err) }
        if ( !doc ) { req.error( 404, ERROR.ASSET_NOT_FOUND ); return next() }
        res.json( { ok : 1, _id: req.params.assetId } );
    });
};

exports.removeAllUsersAssets = function( req, res, next ) {
    AssetsModel.removeAll( req, function( err, doc ){
        if ( err  ) { req.error( 500, err ); return next(err) }
    });
};
