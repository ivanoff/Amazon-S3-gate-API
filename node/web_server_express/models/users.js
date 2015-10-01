"use strict"

exports.get = function( req, res, params ){
    if( !params ) params = {};
    var collection = req.db.get( 'users' );
    collection.find( { _id : req.params.id }, params, res );
};

exports.getAll = function( req, res, params ){
    if( !params ) params = {};
    var collection = req.db.get( 'users' );
    collection.find( {}, params, res );
};

