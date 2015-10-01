"use strict"

exports.get = function( req, res, params ){
    if( !params ) params = {};
    req.db.collection('users').find( { _id : req.params.id } ).toArray( res );
};

exports.getAll = function( req, res, params ){
    req.db.collection('users').find( { } ).toArray( res );
};

