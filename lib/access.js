/****
Access lib
****/
"use strict"
var ERROR = require('config').get('ERRORS');

/**
 * Get acess to admin users only
 */
exports.onlyAdmin = 
    function( req, res, next ){ 
        if( !req.currentUser || req.currentUser.type != 'admin' )
            return req.error( ERROR.ACCESS_DENIED )
        else next();
    };

/**
 * Get acess to registered users only
 */
exports.onlyRegistered = 
    function( req, res, next ){ 
        if( !req.currentUser || !req.currentUser.type )
            return req.error( ERROR.ACCESS_DENIED )
        else next();
    };
