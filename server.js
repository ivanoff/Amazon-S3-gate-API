"use strict"

var config = require('config');
var express = require('express');
var bodyParser = require('body-parser');
var bunyan = require('bunyan');
var _ = require('underscore');

var aws = require('./lib/aws');
var db  = require('./lib/db');

var app = new express();

var DB_URL   = config.get( 'DB_URL' ) || process.env.DB_URL;
if( process.env.DB_AUTH ) DB_URL = 'mongodb://'+process.env.DB_AUTH+'@'+DB_URL;

// config part
var PORT     = process.env.SERVER_PORT || config.get( 'SERVER_PORT' ) || 3000,
    LOG_PATH = process.env.LOG_PATH    || config.get( 'LOG_PATH' )    || './log',
    AWS      = config.get( 'AWS' ),
    ERROR    = config.get( 'ERRORS' );

if( process.env.AWS_KEY ) AWS.accessKeyId = process.env.AWS_KEY;
AWS.secretAccessKey = process.env.AWS_SECRET;

// loging part
var log = bunyan.createLogger( { 
  name: "server",
  port: PORT,
  streams: [
      { level: 'debug', stream: process.stdout },
      { level: 'error', path: LOG_PATH+'/error.log' }
  ]
});

// error and nice loging function
var error_and_log = function ( error ){
    if( !error ) error = ERROR.UNKNOWN_ERROR;
    var e = error; 
    if( error.errmsg ) {
        e = ERROR.SERVER_ERROR;
        e.developerMessage = error;
    }
    log.error( e );
    if( e.status ) res.status( e.status )
    else res.status(400);
    res.json( e );
    return e;
}

app.use( function( req, res, next ){ 
    req.db    = db.get(); 
    req.error = error_and_log;
    next();
});

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

// Only 3 routes are garanted w/o token: 
// index page, login and register user pages
require("./routes/index")(app);
require("./routes/register")(app);
require("./routes/login")(app);

// Get the rest routes
var normalizedPath = require("path").join(__dirname, "routes");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./routes/" + file)(app);
});

exports.start = function( done ) {
    aws.connect( AWS, function( err, next ){  });
    db.connect( DB_URL, function( err, next ) {
        if ( err ) { return next( err ) }
        this.server = app.listen( PORT, function() {
            log.info({pid:1},'['+PORT+'] server started');
            console.log( 'Listening on port ' + PORT + '...' );
            done();
        });
    }.bind(this))
}

exports.stop = function( ) {
    this.server.close();
    console.log( 'Server stopped' );
};
