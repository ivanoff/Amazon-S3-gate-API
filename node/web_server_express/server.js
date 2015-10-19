"use strict"

var config = require('config');
var express = require('express');
var uuid = require( 'node-uuid' );
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var bunyan = require('bunyan');
var _ = require('underscore');

var app = new express();

var DB_URL     = process.env.DB_URL || 'mongodb://gl:gl@ds051933.mongolab.com:51933/gl',
    PORT       = process.env.SERVER_PORT || 3000,
    LOG_PATH   = process.env.LOG_PATH || './log',
    ERRORS     = config.get( 'ERRORS' );

var db = require('./controllers/db');

var log = bunyan.createLogger( { 
  name: "server",
  port: PORT,
  streams: [
      { level: 'debug', stream: process.stdout },
      { level: 'error', path: LOG_PATH+'/error.log' }
  ]
});

app.use( function( req, res, next ){ 
    req._     = _; 
    req.db    = db.get(); 
    req.log   = log; 
    req.uuid  = uuid; 
    req.warn  = function(n,e){ 
                    req.log.warn( { warn : n } , e);
                }; 
    req.error = function(n,e){ 
                    var text=ERRORS[e] || e; 
                    if( text==e ) e=1; 
                    req.log.error( { error : e } , text);
                    res.status(n).json( {error:e, text:text} )
                }; 
    next() 
});
app.use( bodyParser.json() );

var normalizedPath = require("path").join(__dirname, "routes");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./routes/" + file)(app);
});

exports.start = function( done ) {
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

