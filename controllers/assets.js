"use strict"
var fs    = require( 'fs'    );
var async = require( 'async' );

var AssetsModel = require('../models/assets');

var ERROR = require('config').get('ERRORS');

exports.getRootAssets = function( req, res, next ){
    AssetsModel.getFolderContent( req, '', function( err, docs ){
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
            if( req.query.download == '' ) {
                req.aws.download( { fileId: doc['_id'], userId: doc['userId'] }, function(){
                    res.download('/tmp/'+doc['_id'], doc['name'], function(){ 
                        fs.unlink('/tmp/'+doc['_id']);
                    });
                } );
            } else {
                res.json( doc );
            }
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
    if( req.files ) {
        doc['type'] = req.files.file.type;
        doc['name'] = req.files.file.originalFilename;
        doc['size'] = req.files.file.size;
    }
    if( !doc['type'] ) doc['type'] = 'folder';
    if( !doc['path'] ) doc['path'] = '';

    async.waterfall([
        function( next ){
            if( req.params.assetId ) {
                AssetsModel.get( req, function( err, docFolder ){
                    if ( err ) { req.error( 500, err ); return next(err) }
                    if ( !docFolder ) 
                            { req.error( 404, ERROR.ASSET_NOT_FOUND ); return next() }
                    if ( docFolder.type != 'folder' ) 
                            { req.error( 404, ERROR.NOT_A_FOLDER ); return next() }
                    doc['path'] = docFolder.path + '/' + docFolder.name;
                    next();
                });
            } else {
                next();
            }
        },
        function( next ){ 
            AssetsModel.validate( doc, function( err ) {
                if( err ) { req.error( 400, err ); return next(err) }

                AssetsModel.add( req, doc, function( err, result, next ){
                    if( err ) { req.error( 500, err ); return next(err) }
                    if( req.files ) {
                        req.aws.upload( { filePath: req.files.file.path,
                            fileId: doc['_id'], userId: doc['userId'] }, function(){
                                fs.unlink( req.files.file.path );
                            } );
                    }
                    res.location( '/users/'+doc['userId']+'/assets/'+doc['_id'] );
                    res.status( 201 );
                    res.json( doc );
                });
            });
            next();
        },
    ]);

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
        if ( doc.type == 'folder' ) {
            next( 'Folder type is not downloadable. But we can zip it. Later. If you want.' );
        } else {
            req.aws.download( { fileId: doc['_id'], userId: doc['userId'] }, function(){
                res.download('/tmp/'+doc['_id'], doc['name'] );
                fs.unlink('/tmp/'+doc['_id']);
            } );
        }
    });
};

exports.removeAsset = function( req, res, next ) {
    AssetsModel.remove( req, function( err, doc ){
        if ( err  ) { req.error( 500, err ); return next(err) }
        if ( !doc ) { req.error( 404, ERROR.ASSET_NOT_FOUND ); return next() }
        req.aws.remove( { fileId: req.params.assetId, userId: req.params.userId }, function(){} );
        res.json( { ok : 1, _id: req.params.assetId } );
    });
};

exports.removeAllUsersAssets = function( req, res, next ) {
    AssetsModel.removeAll( req, function( err, doc ){
        req.aws.remove( { fileId: req.params.userId }, function(){} );
        if ( err  ) { req.error( 500, err ); return next(err) }
    });
};
