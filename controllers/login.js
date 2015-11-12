"use strict"
var jwt = require('jsonwebtoken');
var md5 = require('md5');
var config = require('config');

var UsersModel = require('../models/users');

var ERROR = require('config').get('ERRORS');

/**
 * Login and get Token
 * @param {string} req.body.login - Login of the user
 * @param {string} req.body.password - Password of the user
 * @returns {token:string,_links:{object}} token need for authorized operations
 */
exports.login = function (req, res, next) { 
    if( !req.body.login || !req.body.password ){
        return req.error( ERROR.NO_TOKEN );
    }
    req.body.password = md5( req.body.password );
    UsersModel.search( req, function( err, doc ){
        if ( err  ) return req.error(err);
        if ( !doc ) return req.error( ERROR.USER_NOT_FOUND );

	var token = jwt.sign( doc['_id'], config.TOKEN.secret , {
	    expiresIn: config.TOKEN.expire
	});
	res.json( { token: token,
            _links : {
                self      : { href : '/me' },
                assets    : { href : '/assets' },
                resources : { href : '/resources' },
            }
        });
    })
};

/**
 * MiddleWare for check token and garant or deny access. Set req.currentUser to the owner of token
 * @param {string} req.body.token - Token of the user
 */
exports.middleWare = function( req, res, next ){ 
    var token = req.body.token || req.params.token || req.headers['x-access-token'];
    if( !token ) req.error( ERROR.NO_TOKEN )
    else {
        jwt.verify(token, config.TOKEN.secret, function(err, decoded) {			
            if (err) { req.error( ERROR.BAD_TOKEN ) }
            else {
                UsersModel.getById( req, decoded, function( err, doc ){
                    if ( err  ) return req.error(err);
                    if ( !doc ) return req.error( ERROR.OLD_TOKEN );
                    req.currentUser = doc;
                    next();
                })
            }
        })
    }
};