"use strict"

var vm = require('validate-me');

var modelName = 'users';

// model to validate
var model = {
        '_id':   { type: "uuid", required: true },
        login    : { type: "string", required: true },
        password : { type: "md5",    required: true },
        type  : { type: "string" },
        name: {
            first: { type: "string", max: 128, match : /^[\w\ _`\-]*$/i, required: true },
            last : { type: "string", max: 128, match : /^[\w\ _`\-]*$/i },
        },
        email:    { type: "email"  },
        metadata: { type: "object" },
    };

vm.registerModel( modelName, model );

module.exports = {

    modelName : modelName,

    validate : function( req, next ){ 
        var errors = vm.validate( this.modelName, req );
        if( errors ) return next( JSON.stringify( errors ) );
        return next( false );
    },

    getById : function( req, userId, res ){
        req.db.collection(this.modelName)
            .findOne( { _id : userId }, res );
    },

    search : function( req, res ){
        req.db.collection(this.modelName)
            .findOne( req.body, res );
    },

    getAll : function( req, res ){
        req.db.collection(this.modelName)
            .find( { } ).toArray( res );
    },

    add : function( req, data, res ){
        req.db.collection(this.modelName)
            .insert( data, res );
    },

    update : function( req, data, res ){
        req.db.collection(this.modelName)
            .update( { _id : req.params.userId }, data, res );
    },

    remove : function( req, res ){
        req.db.collection(this.modelName)
            .remove( { _id : req.params.userId }, res );
    }

}
