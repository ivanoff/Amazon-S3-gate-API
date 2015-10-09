"use strict"

var vm = require('validate-me');

var modelName = 'users';

var model = {
        _id:   { type: "uuid", required: true },
        name: {
            first : { type: "string", max: 128, required: true },
            last  : { type: "string", max: 128 },
        },
        email:    { type: "email"  },
        metadata: { type: "object" },
    };

vm.registerModel( modelName, model );

module.exports = {

    modelName : modelName,

    validate : function( req, res, next ){ 
        var errors = vm.validate( this.modelName, req );
        if( errors ) next( JSON.stringify( errors ) );
    },

    get : function( req, res ){
        req.db.collection(this.modelName)
            .findOne( { _id : req.params.id }, res );
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
            .update( { _id : req.params.id }, data, res );
    },

    remove : function( req, res ){
        req.db.collection(this.modelName)
            .remove( { _id : req.params.id }, res );
    }

}
