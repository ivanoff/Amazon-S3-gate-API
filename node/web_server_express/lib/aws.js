/****
 Work with AWS S3
****/
"use strict"

var fs = require('fs');
var AWS = require('aws-sdk'); 

var s3, bucket;

function getBucket ( req ) {
    var subFolder = req.userId ? '/'+req.userId : '';
    return bucket+subFolder;
}

exports.connect = function( req, done ) {
    bucket = req.bucket;
    AWS.config.update({accessKeyId: req.accessKeyId, secretAccessKey: req.secretAccessKey});
    s3 = new AWS.S3();
    console.log( 's3 connected...' );
    done( );
}

exports.disconnect = function( done ) {
    if ( s3 ) s3 = null;
    done( );
}

exports.upload = function( req, done ) {
    var body = fs.createReadStream( req.filePath );
    s3.upload( { Bucket: getBucket( req ), Key: req.fileId, Body: body} )
        .on( 'httpUploadProgress', function(evt) { console.log(evt) })
        .send( function(err, data) { console.log(err, data) } );
}

exports.download = function( req, done ) {
    var params = { Bucket: getBucket( req ), Key: req.fileId };
    var file = require('fs').createWriteStream("/tmp/"+req.fileId);
    s3.getObject(params, function() {
            console.log("done downloading");
            done();
        })
        .createReadStream().pipe(file);
}

exports.remove = function( req, done ) {
    s3.deleteObject({Bucket: getBucket( req ), Key: req.fileId }, 
        function(err, data) {
            if (err) done(err)
            else console.log("Successfully deleted key "+req.fileId+" on "+getBucket( req ));   
            done();
    });
}
