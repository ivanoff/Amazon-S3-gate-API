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

/**
 * Connect to AWS 
 * @param {string} req.accessKeyId - access key Id
 * @param {string} req.secretAccessKey - secret
 */
exports.connect = function( req, done ) {
    bucket = req.bucket;
    AWS.config.update({accessKeyId: req.accessKeyId, secretAccessKey: req.secretAccessKey});
    s3 = new AWS.S3();
    console.log( 's3 connected...' );
    done( );
}

/**
 * Disconnect from AWS 
 */
exports.disconnect = function( done ) {
    if ( s3 ) s3 = null;
    done( );
}

/**
 * Upload file to S3
 * @param {string} req.fileId - filename of new uploaded file
 * @param {string} req.filePath - path to local file
 * @param {string} body - file's content
 */
exports.upload = function( req, done ) {
    var body = fs.createReadStream( req.filePath );
    s3.upload( { Bucket: getBucket( req ), Key: req.fileId, Body: body} )
        .on( 'httpUploadProgress', function(evt) { console.log(evt) })
        .send( function(err, data) { console.log(err, data) } );
}

/**
 * Download file from S3
 * @param {string} req.fileId - filename of downloaded file
 */
exports.download = function( req, done ) {
    var params = { Bucket: getBucket( req ), Key: req.fileId };
    var file = require('fs').createWriteStream("/tmp/"+req.fileId);
    s3.getObject(params, function() {
            console.log("done downloading");
            done();
        })
        .createReadStream().pipe(file);
}

/**
 * Delete file from S3
 * @param {string} req.fileId - filename to remove
 */
exports.remove = function( req, done ) {
    s3.deleteObject({Bucket: getBucket( req ), Key: req.fileId }, 
        function(err, data) {
            if (err) done(err)
            else console.log("Successfully deleted key "+req.fileId+" on "+getBucket( req ));   
            done();
    });
}
