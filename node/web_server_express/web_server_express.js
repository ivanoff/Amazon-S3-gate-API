
var config  = require( 'config'    );
var express = require( 'express'   );
var uuid    = require( 'node-uuid' );

var bodyParser = require('body-parser');

var db = require( './db' );

var app = express();
app.use( bodyParser.urlencoded({ extended: true }) );

var URL        = config.get( 'DB.url' ),
    COLLECTION = config.get( 'DB.collection' ),
    PORT       = config.get( 'SERVER.port' ),
    ERROR      = config.get( 'ERROR' );

showUsers = function ( users ) {
    return "  ID\t\t\t\t\t|  Last name\t|  First name\t|  Email\n" + 
    users
      .map(function( e ){
            return [ e._id, e.name.last, e.name.first, e.email, e.metadata ].join("\t|  ");
        })
      .join("\n")
}


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


app.get('/users', function (req, res) {
    db.collection.find().toArray(function( err, users ) {
        if ( users[0] ) {
            res.send( showUsers( users ) );
        } else {
            res.send( "No users found. Please, use POST to add new user." );
        }
    })
})


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


app.post('/users', function (req, res) {

    // check for errors
    var error;

    if( !req.body.first_name ) error = 101
    else if( !req.body.first_name.match(/^[\w\ _]+$/i) ) error = 111;

    if( !req.body.last_name ) error = 102
    else if( !req.body.last_name.match(/^[\w\ _]+$/i) ) error = 112;

    if( !req.body.email ) error = 103
    else if( !req.body.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i) ) error = 113;
    
    if ( error ) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect. #' + error + ": " + ERROR[error] );
    } 

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


app.post('/users/:id', function (req, res) {

    // check for errors
    var error;

    if( !req.body.first_name ) error = 101
    else if( !req.body.first_name.match(/^[\w\ _]+$/i) ) error = 111;

    if( !req.body.last_name ) error = 102
    else if( !req.body.last_name.match(/^[\w\ _]+$/i) ) error = 112;

    if( !req.body.email ) error = 103
    else if( !req.body.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i) ) error = 113;
    
    if ( error ) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect. #' + error + ": " + ERROR[error] );
    } 

    var data = {
        name: {
            first : req.body.first_name,
            last  : req.body.last_name,
        },
        email: req.body.email,
        metadata: req.body.metadata? req.body.metadata : {},
    }

    db.collection.update( { _id : req.params.id }, data, function(err, result) {
        if (err) {
            res.statusCode = 500;
            error = 202;
            return res.send('Error 500: Internal Server Error. #' + error + ": " + ERROR[error] + ' : ' + err );
         } else {
            return res.send('Recors ' + req.params.id + ' was updated' );
        }
    } )

})


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


//app.post('/users', function (req, res) {

//})

app.get('/i', function (req, res) {
  var collection = db.get().collection( COLLECTION );

  collection.insert({_id: uuid.v4(),name: 'tacoa', tasty: true}, function(err, result) {
    collection.find({name: 'tacoa'}).toArray(function(err, docs) {
      console.log(docs[0])
    })
  })
  
  res.send('i');
})

