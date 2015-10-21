"use strict"
/****
 Work with AWS S3
****/

var s3 = require('s3');

var state2 = { s3: null };

exports.connect = function( req, done ) {

    var client = s3.createClient({
        maxAsyncS3: 20,     // this is the default
        s3RetryCount: 3,    // this is the default
        s3RetryDelay: 1000, // this is the default
        multipartUploadThreshold: 20971520, // this is the default (20 MB)
        multipartUploadSize: 15728640,      // this is the default (15 MB)
        s3Options: {
            accessKeyId: "AKIAJT472G2WQ6HTQDPA",
            secretAccessKey: "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",
            // any other options are passed to new AWS.S3()
            // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
        },
    }, function( err ) {
        done( err );
    });
    state2.s3 = client;
    console.log( '1234-1234' );
    done( );
}

exports.get = function() {
    return state2.s3;
}

exports.close = function( done ) {
    if ( state2.s3 ) state2.s3 = null;
    done( );
}


exports.upload = function( req, done ) {
    var params = {
      localFile: req.filePath,

      s3Params: {
        Bucket: "ivanoff",
        Key: req.fileId,
        // other options supported by putObject, except Body and ContentLength.
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
      },
    };
    var uploader = state2.s3.uploadFile(params);
    uploader.on('error', function(err) {
      console.error("unable to upload:", err.stack);
      return done( "unable to upload:", err.stack );
    });
    uploader.on('progress', function() {
      console.log("progress", uploader.progressMd5Amount,
                uploader.progressAmount, uploader.progressTotal);
    });
    uploader.on('end', function() {
      console.log("done uploading");
    });
}


exports.download = function( req, done ) {
    var params = {
      localFile: "/tmp/temp2/"+req.fileId,
    
      s3Params: {
        Bucket: "ivanoff",
        Key: req.fileId,
        // other options supported by getObject
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
      },
    };
    var downloader = state2.s3.downloadFile(params);
    downloader.on('error', function(err) {
      console.error("unable to download:", err.stack);
    });
    downloader.on('progress', function() {
      console.log("progress", downloader.progressAmount, downloader.progressTotal);
    });
    downloader.on('end', function() {
      console.log("done downloading");
    });
}
