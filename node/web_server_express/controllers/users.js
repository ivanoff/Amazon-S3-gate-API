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
            if (err)   { return next(err); }
            if (!docs) { return next(404); }
            res.json( docs );
        });
    });

    app.post('/users', function( req, res, next ) {

/*
        if( !req.body.first_name ) return next( ERROR[101] );
    else if( !req.body.first_name.match(/^[\w\ _`\-]+$/i) ) error = 111;

    if( !req.body.last_name ) error = 102
    else if( !req.body.last_name.match(/^[\w\ _`\-]+$/i) ) error = 112;

    if( !req.body.email ) error = 103
    else if( !req.body.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i) ) error = 113;
    
    if ( error ) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect. #' + error + ": " + ERROR[error] );
    } 
*/

        var id = req.uuid.v4()
        var data = {
            _id: id,
            name: {
                first : req.body.first_name,
                last  : req.body.last_name,
            },
            email: req.body.email,
            metadata: req.body.metadata? req.body.metadata : {},
        }

        UsersModel.add( req, data, function( err, result, next ){
            if (err) return next(err);
            res.json( { ok : 1, _id: id } );
        });

    });

    app.delete('/users/:id', function( req, res, next ) {
        UsersModel.remove( req, function( err, docs ){
            if (err)   { return next(err); }
            if (!docs) { return next(404); }
            res.json( { ok : 1, _id: req.params.id } );
        });
    });


}
