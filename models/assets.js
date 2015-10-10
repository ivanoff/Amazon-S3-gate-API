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

    add : function( req, data, res ){
        req.db.collection(this.modelName)
            .insert( data, res );
    },

    update : function( req, data, res ){
        req.db.collection(this.modelName)
            .update( { _id : req.params.assetId }, data, res );
    },

    remove : function( req, res ){
        req.db.collection(this.modelName)
            .remove( { _id : req.params.assetId }, res );
    }

}
