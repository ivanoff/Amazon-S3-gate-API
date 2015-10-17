"use strict"

var vm = require('validate-me');

var modelName = 'assets';

var model = {
        '_id': { type: "uuid", required: true },
        masterRegion: { type: "string" },
        userId: { type: "uuid", required: true },
        path: { type: "string" },  // full path to document
        name: { type: "string", min:1, match: /[^\/]/, required: true },
        type: { type: "string", required: true },  // type of document
        size: { type: "integer" }, // size in bytes
        permissions: { type: "integer", min: 11, max: 33 },  
            //first digit - owner's rights, last one - other user's
            //1-can write, 2-can read, 3-can read and write
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
            .findOne( { userId : req.params.userId, _id : req.params.assetId }, res );
    },

    getRoot : function( req, res ){
        req.db.collection(this.modelName)
            .find( { userId : req.params.userId, path : '' } ).toArray( res );
    },

    getFolderContent : function( req, path, res ){
        req.db.collection(this.modelName)
            .find( { userId : req.params.userId, path : path } ).toArray( res );
    },

    add : function( req, data, res ){
        req.db.collection(this.modelName)
            .insert( data, res );
    },

    update : function( req, data, res ){
        req.db.collection(this.modelName)
            .update( { userId : req.params.userId, _id : req.params.assetId }, data, res );
    },

    search : function( req, res ){
        req.db.collection(this.modelName)
            .find( { userId : req.params.userId, name : new RegExp( req.params.name, 'i' ) } ).toArray( res );
    },

    remove : function( req, res ){
        this.get( req, function( err, doc ){
            if ( err  ) { req.error( 500, err ); return next(err) }
            if ( !doc ) { req.error( 404, 131 ); return next() }  // Asset not found

            if( doc.type == 'folder' ) {
                //delete all nested assets in folder
                var path = doc.path + '/' + doc.name;
                req.db.collection(this.modelName)
                    .remove( { userId : req.params.userId, path : new RegExp('^'+path+'(/.*)?$') } );
            }
            req.db.collection(this.modelName)
                .remove( { userId : req.params.userId, _id : req.params.assetId }, res );

        }.bind(this));
    },

    removeAll : function( req, res ){
        req.db.collection(this.modelName)
            .remove( { userId : req.params.userId }, res );
    }

}
