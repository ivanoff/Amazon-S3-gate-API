"use strict"

module.exports = function (app) {

    var UsersModel = require('../models/users');

    app.get( '/users', function( req, res, next ){
        UsersModel.getAll( req, function( err, docs ){
            if (err) { return next(err); }
            res.json( docs );
        });
    });

    app.get('/users/:id', function( req, res, next ) {
        UsersModel.get( req, function( err, docs ){
console.log( '---------------------------------------' );
console.log( docs );
            if (err)   { return next(err); }
            if (!docs) { return next(404); }
            res.json( docs );
        });
    });

}
