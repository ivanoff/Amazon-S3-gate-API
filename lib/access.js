/****
Access lib
****/
"use strict"
var ERROR = require('config').get('ERRORS');

exports.onlyAdmin = 
    function( req, res, next ){ 
        if( !req.currentUser || req.currentUser.type != 'admin' )
            return req.error( ERROR.ACCESS_DENIED )
        else next();
    };
