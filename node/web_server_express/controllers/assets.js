"use strict"
var fs     = require( 'fs'     );
var fs2    = require('fs-extra')
var mkdirp = require( 'mkdirp' );
var async  = require( 'async'  );

var AssetsModel = require('../models/assets');
var OptionsModel = require('../models/options');
var ResourcesModel = require('../models/resources');

var ERROR = require('config').get('ERRORS');

exports.getRootAssets = function( req, res, next ){
    AssetsModel.getFolderContent( req, '', function( err, docs ){
        if ( err   ) return req.error(err);
        if ( !docs ) docs = [];
        res.json( docs );
    });
};

exports.getAssetById = function( req, res, next ) {
    AssetsModel.get( req, function( err, doc ){
        if ( err  ) return req.error(err);
        if ( !doc ) { return req.error( ERROR.ASSET_NOT_FOUND ) }
        if ( doc.type != 'folder' ) res.json( doc )
        else {
            AssetsModel.getFolderContent( req, doc.path + '/' + doc.name, function( err, doc ){
                if ( err  ) return req.error(err);
                if ( !doc ) { return req.error( ERROR.ASSET_NOT_FOUND ) }
                doc._links = {
                    self      : { href : '/assets/' + doc._id },
                    resources : { href : '/resources' },
                };
                res.json( doc );
            });
        }
    });
};

exports.getAssetContentById = function( req, res, next ) {
    AssetsModel.get( req, function( err, doc ){
        if ( err  ) return req.error(err);
        if ( !doc ) { return req.error( ERROR.ASSET_NOT_FOUND ) }
        var dir = '/tmp/'+doc._id;
        if ( doc.type != 'folder' ) {
            req.aws.download( { fileId: doc['_id'], userId: doc['userId'] }, function(){
                res.download(dir, doc['name'], function(){ 
                    fs.unlink(dir);
                });
            });
        } else {
            if ( !fs.existsSync(dir) ) fs.mkdirSync(dir);
            AssetsModel.search( req, { path : new RegExp( '^'+doc.path+'/'+doc.name+'(/.*)?$' ) }, function( err, docs ){
                docs.forEach( function( d ) {
                    d.path = d.path.replace( new RegExp( '^'+doc.path ), dir );
                    if( d.type == 'folder' ) d.path += '/'+d.name;
                    mkdirp( d.path, function ( err ) {
                        if( d.type != 'folder' ) {
                            req.aws.download( { fileId: doc['_id'], userId: doc['userId'] }, function(){
                                res.download(d.path, doc['name'], function(){});
                            });
                        }
                    });
                });
            });

            var EasyZip = require('easy-zip').EasyZip;
            var zip = new EasyZip();
            zip.zipFolder(dir+'/'+doc.name,function(){
                zip.writeToFile(dir+'.zip', function() {
                    res.download(dir+'.zip', doc.name+'.zip', function(){ 
                        fs.unlink(dir+'.zip');
                        fs2.remove(dir, function(error){});
                    });
                });
            });

        }
    });
};

exports.addAsset = function( req, res, next ) {
    var doc    = req.body;
    doc['_id'] = req.uuid.v4();
    doc['userId'] = req.currentUser._id;
    if( req.files ) {
        doc['type'] = req.files.file.type.replace(/(\/.*)/,'');
        doc['name'] = req.files.file.originalFilename;
        doc['size'] = req.files.file.size;
    }
    if( !doc['type'] ) doc['type'] = 'folder';
    if( !doc['path'] ) doc['path'] = '';

    var usersResources = { count:0, totalSize:0 };
    
    async.waterfall([
        function( next ){
            ResourcesModel.getResourcesByType( req, '_total', function( err, resources ){
                if ( resources ) usersResources = resources;
                next();
            })
        },
        function( next ){
            OptionsModel.getOptionsByName( req, 'limit.size', function( err, usersLimit ){
                if( usersLimit && usersLimit.value < usersResources.totalSize + doc.size )
                    return req.error( ERROR.LIMIT_TOTAL_SIZE )
                else next();
            })
        },
        function( next ){
            OptionsModel.getOptionsByName( req, 'limit.files', function( err, usersLimit ){
                if( usersLimit && usersLimit.value < usersResources.count + 1 )
                    return req.error( ERROR.LIMIT_COUNT_FILES )
                else next();
            })
        },
        function( next ){
            if( req.params.assetId ) {
                doc.parentId = req.params.assetId;
                AssetsModel.get( req, function( err, docFolder ){
                    if ( err ) return req.error(err);
                    if ( !docFolder ) return req.error( ERROR.ASSET_NOT_FOUND );
                    if ( docFolder.type != 'folder' ) return req.error( ERROR.NOT_A_FOLDER );
                    doc['path'] = docFolder.path + '/' + docFolder.name;
                    next();
                });
            } else {
                next();
            }
        },
        function( next ){ 
            AssetsModel.validate( doc, function( err ) {
                if( err ) { req.status=400; return next(err) }

                AssetsModel.add( req, doc, function( err, result, next ){
                    if( err ) return req.error(err);
                    if( req.files ) {
                        req.aws.upload( { filePath: req.files.file.path,
                            fileId: doc['_id'], userId: doc['userId'] }, function(){
                                fs.unlink( req.files.file.path );
                            } );
                    }
                    doc._links = {
                        self      : { href : '/assets/'+doc._id },
                        resources : { href : '/resources' },
                    };
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
        if ( err  ) return req.error(err);
        if ( !doc ) { return req.error( ERROR.ASSET_NOT_FOUND ) }

        doc = req._.extend( doc, req.body );

        AssetsModel.validate( doc, function( err ) {
            if ( err ) { req.status=400; return next(err) }

            AssetsModel.update( req, req.params.assetId, doc, function( err, result, next ){
                if ( err ) return req.error(err);
                doc._links = {
                    self      : { href : '/assets/'+doc._id },
                    resources : { href : '/resources' },
                };
                res.status( 201 ).json( doc );
            });
        });

    });
};

exports.search = function( req, res, next ){

    var query = { userId : req.currentUser._id, name : new RegExp( req.params.name, 'i' ) };

    async.waterfall([
        function( next ){
            if( !req.params.assetId ) next()
            else {
                AssetsModel.get( req, function( err, doc ){
                    if ( err  ) return req.error(err);
                    if ( !doc ) return req.error( ERROR.ASSET_NOT_FOUND );
                    if ( doc.type != 'folder' ) return req.error( ERROR.NOT_A_FOLDER );
                    query.path = new RegExp( '^'+doc.path+'/'+doc.name );
                    next();
                })
            }
        },
        function( next ){
            AssetsModel.search( req, query, function( err, docs ){
                if ( err   ) return req.error(err);
                if ( !docs ) docs = [];
                res.json( docs );
            });
            next();
        }
    ]);

};

exports.moveAssetToFolder = function( req, res, next ) {
    async.parallel( {
        file : function( callback ) {
            AssetsModel.search( req, { _id : req.params.assetId }, function( err, doc ){
                if ( err  ) callback( err );
                if ( !doc ) callback( ERROR.ASSET_NOT_FOUND );
                callback( null, doc.shift() );
            });
        },
        folder : function( callback ) {
            AssetsModel.search( req, { _id : req.params.folderId }, function( err, doc ){
                doc = doc.shift();
                if ( err  ) callback( err );
                if ( !doc ) callback( ERROR.ASSET_NOT_FOUND );
                if ( doc.type != 'folder' ) callback( ERROR.NOT_A_FOLDER );
                callback( null, doc );
            });
        },
    }, function( err, doc ) {  
        if( !doc.file || !doc.folder ) return req.error( err );
        AssetsModel.search( req, { name : doc.file.name, parentId : doc.folder._id }, function( err, doc_exist ){
            doc_exist = doc_exist.shift();
            if ( err ) return req.error( err );
            if ( doc_exist ) return req.error( ERROR.ASSET_EXISTS );
            AssetsModel.updatePath( req, doc.file.path, doc.folder.path+'/'+doc.folder.name, function(){
                doc.file.parentId = doc.folder._id;
                doc.file.path = doc.folder.path+'/'+doc.folder.name;
                AssetsModel.update( req, doc.file._id, doc.file, function( err, updated_doc ){});
            });
            res.json( doc.file );
        });
    });
};

exports.removeAsset = function( req, res, next ) {
    AssetsModel.remove( req, function( err, doc ){
        if ( err  ) return req.error(err);
        if ( !doc ) { return req.error( ERROR.ASSET_NOT_FOUND ) }
        req.aws.remove( { fileId: req.params.assetId, userId: req.currentUser._id }, function(){} );
        res.json( { ok : 1, _id: req.params.assetId } );
    });
};

exports.removeAllUsersAssets = function( req, res, next ) {
    AssetsModel.removeAll( req, function( err, doc ){
        req.aws.remove( { fileId: req.currentUser._id }, function(){} );
        if ( err ) return req.error(err);
    });
};
