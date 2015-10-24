"use strict"
var async = require('async');
var UsersModels = require('../models/users');
var ResourcesModels = require('../models/resources');
var OptionsModels = require('../models/options');

exports.me = function( req, res ) {
    async.parallel( {
        user : function( next ) {
            UsersModels.getById(req, req.currentUser._id, function(err,doc){next(null,doc)}) 
        },
        resources : function( next ) {
            ResourcesModels.getResourcesByType(req,'_total', function(err,doc){next(null,doc)}) 
        },
        options : function( next ) {
            OptionsModels.getOptions(req, function(err,doc){next(null,doc)}) 
        },
    }, function( err, doc ) {  
        res.json( doc );
    } );
};

