"use strict"

var OptionsModel = require('../models/options');

/**
 * Get list of options of all user's types of just of req.currentUser only
 */
exports.getAllOptions = function( req, res, next ){
    OptionsModel.getOptions( req, function( err, docs ){
        if ( err   ) return req.error(err);
        if ( !docs ) return req.error( ERROR.NO_OPTIONS );
        res.json( docs );
    });
};


