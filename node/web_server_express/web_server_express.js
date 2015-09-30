/****
 Simple web server
 Usage:
    node web_server_express.js
 Created by:
    Dimitry, 2@ivanoff.org.ua
****/

var config  = require( 'config'    );
var express = require( 'express'   );
var uuid    = require( 'node-uuid' );
var bodyParser = require('body-parser');

var db = require( './modules/db' );
var models = require( './modules/models' );

var app = express();
app.use( bodyParser.urlencoded({ extended: true }) );

// params from config file ( ./config/default.json )
var URL        = config.get( 'DB.url' ),
    COLLECTION = config.get( 'DB.collection' ),
    PORT       = config.get( 'SERVER.port' ),
    ERROR      = config.get( 'ERROR' );

// short template to show list of users
showUsers = function ( users ) {
    return "  ID\t\t\t\t\t|  Last name\t|  First name\t|  Email\n" + 
    users
      .map(function( e ){
            return [ e._id, e.name.last, e.name.first, e.email, e.metadata ].join("\t|  ");
        })
      .join("\n")
}


// Connect to DB and start express
db.connect( URL, function( err ) {
    if ( err ) {
        console.log( 'Unable to connect to Mongo' );
        process.exit( 1 );
    } else {
        db.collection = db.get().collection( COLLECTION );
        app.listen( PORT, function() {
            console.log( 'Listening on port ' + PORT + '...' )
        })
    }
})


app.get('/', function (req, res) { res.redirect('/users') })

// GET all users from DB
// Example:
//   curl 127.0.0.1:3000/users
// Example output:
//     ID|  Last name|  First name|  Email
//     4c5adf87-c7be-47ec-a946-be23d5527e49|  Abramsky|  Max|  aa@aa.ua|
//     3931b794-1aef-4520-bd39-236017599a4a|  Abramsky|  Linda|  aa@aa.ua|
app.get('/users', function (req, res) {
    db.collection.find().toArray(function( err, users ) {
        if ( users[0] ) {
            res.send( showUsers( users ) );
        } else {
            res.send( "No users found. Please, use POST to add new user." );
        }
    })
})

// GET user from DB. Return 404 if user not found
// Example:
//   curl 127.0.0.1:3000/users/3931b794-1aef-4520-bd39-236017599a4a
// Example output:
//     ID       |  Last name    |  First name   |  Email
//     3931b794-1aef-4520-bd39-236017599a4a|  Abramsky|  Linda|  aa@aa.ua| 
app.get('/users/:id', function (req, res) {
    db.collection.find( { _id : req.params.id } ).toArray(function( err, users ) {
        if ( users[0] ) {
            res.send( showUsers( users ) );
        } else {
            res.statusCode = 404;
            error = 121;
            return res.send('Error 404: Not found. #' + error + ": " + ERROR[error] );
        }
    })
})

// POST users to DB
// Example:
//   curl -d "first_name=Linda&last_name=Abramsky&email=aa@aa.ua" 127.0.0.1:3000/users
// Example output:
//   Recors was inserted. New record id: 3931b794-1aef-4520-bd39-236017599a4a
app.post('/users', function (req, res) {

    // check for errors
    var error;

    if( !req.body.first_name ) error = 101
    else if( !req.body.first_name.match(/^[\w\ _`\-]+$/i) ) error = 111;

    if( !req.body.last_name ) error = 102
    else if( !req.body.last_name.match(/^[\w\ _`\-]+$/i) ) error = 112;

    if( !req.body.email ) error = 103
    else if( !req.body.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i) ) error = 113;
    
    if ( error ) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect. #' + error + ": " + ERROR[error] );
    } 

    // make structure to add to the DB
    var id = uuid.v4()
    var data = {
        _id: id,
        name: {
            first : req.body.first_name,
            last  : req.body.last_name,
        },
        email: req.body.email,
        metadata: req.body.metadata? req.body.metadata : {},
    }

    db.collection.insert( data, function(err, result) {
        if (err) {
            res.statusCode = 500;
            error = 201;
            return res.send('Error 500: Internal Server Error. #' + error + ": " + ERROR[error] + ' : ' + err );
         } else {
            return res.send('Recors was inserted. New record id: ' + id );
        }
    } )

})

// PATCH user by :id. Return 404 if user not found
// Example:
//   curl -d "first_name=Maxim&last_name=Abramsky&email=max@abramsky.com" 127.0.0.1:3000/users/dceb2717-34ce-4bd4-92ac-893e65bb1504
// Example output:
//   Recors dceb2717-34ce-4bd4-92ac-893e65bb1504 was updated
app.post('/users/:id', function (req, res) {

    // check for errors
    var error;

    // try to find record to update
    db.collection.findOne( { _id : req.params.id }, function( err, data ) { 
        if ( !data ) {
            res.statusCode = 404;
            error = 121;
            return res.send('Error 404: Not found. #' + error + ": " + ERROR[error] );
        } else {

            // check incoming parameters
            if( req.body.first_name ) {
                if( !req.body.first_name.match( /^[\w\ _`\-]+$/i) ) { error = 111 } 
                else { data.name.first = req.body.first_name };
            }
            if( req.body.last_name ) {
                if( !req.body.last_name.match ( /^[\w\ _`\-]+$/i) ) { error = 112 } 
                else { data.name.last = req.body.last_name };
            }
            if( req.body.email ) {
                if( !req.body.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i) ) { error = 113 } else { data.email = req.body.email };
            }
            if ( req.body.metadata ) data.metadata = req.body.metadata;
        
            if ( error ) {
                res.statusCode = 400;
                return res.send('Error 400: Post syntax incorrect. #' + error + ": " + ERROR[error] );
            } 

            // try update record
            db.collection.update( { _id : req.params.id }, data, function(err, result) {
                if (err) {
                    res.statusCode = 500;
                    error = 202;
                    return res.send('Error 500: Internal Server Error. #' + error + ": " + ERROR[error] + ' : ' + err );
                 } else {
                    return res.send('Recors ' + req.params.id + ' was updated' );
                }
            } )

        }
    });


})

// DELETE user from BD
// Example:
//   curl -X "DELETE" 127.0.0.1:3000/users/3931b794-1aef-4520-bd39-236017599a4a
// Example output:
//   User 3931b794-1aef-4520-bd39-236017599a4a removed
app.delete('/users/:id', function (req, res) {
    db.collection.remove( { _id : req.params.id } ,function( err, user ) {
        if (err) {
            res.statusCode = 500;
            error = 201;
            return res.send('Error 500: Internal Server Error. #' + error + ": " + ERROR[error] + ' : ' + err );
        } else {
            return res.send( 'User '+ req.params.id +' removed' );
        }
    })
})

