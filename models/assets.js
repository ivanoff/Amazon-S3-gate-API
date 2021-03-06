"use strict"

var vm = require('validate-me');
var ResourcesModel = require('./resources');
var aws = require('../lib/aws');

var ERROR = require('config').get('ERRORS');

var modelName = 'assets';

// model to validate
var model = {
        '_id': { type: "uuid", required: true },
        userId: { type: "uuid", required: true },
        path: { type: "string" },  // full path to document
        name: { type: "string", min:1, match: /[^\/]/, required: true },
        type: { type: "string", match: /^[^_]/, required: true },
        size: { type: "integer" }, // size in bytes
        parentId: { type: "string" },
    };

vm.registerModel( modelName, model );

module.exports = {

    modelName : modelName,

    validate : function( req, next ){ 
        var errors = vm.validate( this.modelName, req );
        if( errors ) return next( JSON.stringify( errors ) );
        return next( false );
    },

    get : function( req, res ){
        req.db.collection(this.modelName)
            .findOne( { userId : req.currentUser._id, _id : req.params.assetId }, res );
    },

    getFolderContent : function( req, path, res ){
        req.db.collection(this.modelName)
            .find( { userId : req.currentUser._id, 
                     path : path } ).toArray( res );
    },

    add : function( req, data, res ){
        ResourcesModel.updateResources( req, data, +1, function( ){ } );
        req.db.collection(this.modelName)
            .insert( data, res );
    },

    update : function( req, id, data, res ){
        req.db.collection(this.modelName)
            .update( { userId : req.currentUser._id, _id : id }, data, res );
    },

    updatePath : function( req, from, to, res ){
        req.db.collection(this.modelName)
            .find( { userId : req.currentUser._id, path : new RegExp( '^'+from+'/(.*)?$' ) } )
            .forEach( function(doc) {
                doc.path = doc.path.replace( new RegExp( '^'+from+'/(.*)' ), to+"/$1" );
                req.db.collection(this.modelName)
                    .update( { _id : doc._id }, { $set : { "path" : doc.path } }, res );
            }.bind(this));
    },

    search : function( req, query, res ){
        req.db.collection(this.modelName)
            .find( query ).toArray(res);
    },

    // remove files from database/storage
    remove : function( req, res ){
        this.get( req, function( err, doc ){
            if ( err  ) { req.error( 500, err ); return next(err) }
            if ( !doc ) { req.error( 404, ERROR.ASSET_NOT_FOUND ); return next() }

            if( doc.type == 'folder' ) {
//to-do controllers to controllers
                //delete all nested assets in folder
                var path = doc.path + '/' + doc.name;
                var cursor = req.db.collection(this.modelName)
                    .find( { userId : req.currentUser._id, path : new RegExp('^'+path+'(/.*)?$') } );
                cursor.each(function(err, item) {
                    if( item ) {
                        ResourcesModel.updateResources( req, item, -1, function(){} )
                        aws.remove( { fileId: item['_id'], userId: req.currentUser._id }, function(){} );
                    }
                });
                req.db.collection(this.modelName)
                    .remove( { userId : req.currentUser._id, path : new RegExp('^'+path+'(/.*)?$') } );
            }
            ResourcesModel.updateResources( req, doc, -1, function(){} );
            req.db.collection(this.modelName)
                .remove( { userId : req.currentUser._id, _id : req.params.assetId }, res );

        }.bind(this));
    },

    removeAll : function( req, res ){
        req.db.collection(this.modelName)
            .remove( { userId : req.currentUser._id }, res );
    }

}
