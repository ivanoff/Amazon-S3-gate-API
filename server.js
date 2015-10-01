"use strict"

var config = require('config');
var express = require('express');
var uuid = require( 'node-uuid' );
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');

var DB_URL     = config.get( 'DB.url' ),
    COLLECTION = config.get( 'DB.collection' ),
    PORT       = config.get( 'SERVER.port' ),
    ERROR      = config.get( 'ERROR' );

var app = new express();
var db = monk( DB_URL );

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( function( req, res, next ){ req.db = db; next() });


require('./controllers/routes')(app);


db.once( 'open', function callback () {
    app.listen( PORT, function() {
        console.log( 'Listening on port ' + PORT + '...' )
    })
});
