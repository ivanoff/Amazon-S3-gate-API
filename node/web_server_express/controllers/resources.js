"use strict"

var ResourcesModel = require('../models/resources');

var ERROR = require('config').get('ERRORS');

exports.getResources = function( req, res, next ){
    ResourcesModel.getResources( req, function( err, docs ){
        if ( err   ) { req.status=500; return next(err) }
        if ( !docs ) { return req.error( ERROR.NO_ASSETS ) }
        res.json( docs );
    });
};


