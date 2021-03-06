"use strict"

var ResourcesModel = require('../models/resources');

var ERROR = require('config').get('ERRORS');

/**
 * Get list of resources of registered user
 * @param {string} req.params.type - Type of resource, optional
 */
exports.getResources = function( req, res, next ){
    ResourcesModel.getResources( req, function( err, docs ){
        if ( err   ) return req.error(err);
        if ( !docs ) return req.error( ERROR.NO_ASSETS );
        res.json( docs );
    });
};


