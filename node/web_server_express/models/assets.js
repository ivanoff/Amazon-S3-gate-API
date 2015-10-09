"use strict"

exports.modelName = 'asserts';

exports.get = function( req, res ){
    req.db.collection(this.modelName)
        .findOne( { _id : req.params.id }, res );
};

exports.getAll = function( req, res ){
    req.db.collection(this.modelName)
        .find( { } ).toArray( res );
};

exports.add = function( req, data, res ){
    req.db.collection(this.modelName)
        .insert( data, res );
};

exports.update = function( req, data, res ){
    req.db.collection(this.modelName)
        .update( { _id : req.params.id }, data, res );
};

exports.remove = function( req, res ){
    req.db.collection(this.modelName)
        .remove( { _id : req.params.id }, res );
};

