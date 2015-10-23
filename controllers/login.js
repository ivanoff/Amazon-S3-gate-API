"use strict"
var jwt = require('jsonwebtoken');
var md5 = require('md5');

var UsersModel = require('../models/users');

var ERROR = require('config').get('ERRORS');

exports.login = function (req, res, next) { 
    if( !req.body.login || !req.body.password ){
        return req.error( ERROR.NO_TOKEN );
    }
    req.body.password = md5( req.body.password );
    UsersModel.search( req, function( err, doc ){
        if ( err  ) { req.status=500; return next(err) }
        if ( !doc ) { return req.error( ERROR.USER_NOT_FOUND ); }

	var token = jwt.sign( doc['_id'], req.TOKEN_PARAMS.secret , {
	    expiresIn: req.TOKEN_PARAMS.expire
	});
	res.json( { token: token } );
    })
};


exports.middleWare = function( req, res, next ){ 
    var token = req.body.token || req.params.token || req.headers['x-access-token'];
    if( !token ) req.error( ERROR.NO_TOKEN )
    else {
        jwt.verify(token, req.TOKEN_PARAMS.secret, function(err, decoded) {			
            if (err) { req.error( ERROR.BAD_TOKEN ) }
            else {
                UsersModel.getById( req, decoded, function( err, doc ){
                    if ( err  ) { req.status=500; return next(err) }
                    if ( !doc ) { return req.error( ERROR.OLD_TOKEN ) }
                    req.currentUser = doc;
                    next();
                })
            }
        })
    }
};