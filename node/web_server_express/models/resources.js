"use strict"

var modelName = 'resources';

var model = {
        '_id': { type: "uuid", required: true },
        masterRegion: { type: "string" },
        userId: { type: "uuid", required: true },
        assetType: { type: "string", required: true },
        count: { type: "integer" },
        totalSize: { type: "integer" },
    };

module.exports = {

    modelName : modelName,

    getResources : function( req, res ){
        req.db.collection(this.modelName)
            .find( { userId : req.params.userId } ).toArray( res );
    },

    getResourcesTotal : function( req, res ){
        req.db.collection(this.modelName)
            .findOne( { userId : req.params.userId, assetType : 'video' }, res );
    },

    getResourcesByType : function( req, res ){
        req.db.collection(this.modelName)
            .findOne( { userId : req.params.userId, assetType : req.params.type }, res );
    },

    init : function( req, data, res ){
        req.db.collection(this.modelName)
            .insert( { userId : data['_id'], assetType : '_total', 
                       count : 0, totalSize : 0 }, res );
    },

    update : function( req, data, res ){
        if( !data.type ) data.type = '';
        req.db.collection(this.modelName)
            .findOne( { userId : data.userId, assetType : data.type },
            function( err, doc ){
                if ( !doc ) 
                    req.db.collection(this.modelName)
                        .insert( { userId : data.userId, assetType : data.type, 
                                    count : 0, totalSize : 0 }, res );
                    }.bind(this)
            );
        req.db.collection(this.modelName)
            .updateOne( { userId : data.userId, assetType : data.type }, 
                    { $inc : { count : 1, totalSize : data.size } }, res
            );

        req.db.collection(this.modelName)
            .updateOne( { userId : data.userId, assetType : '_total'}, 
                { $inc : { count : 1, totalSize : data.size } }, res );
    },

    delete : function( req, data, res ){
        if( !req.params.type ) req.params.type = '';
        req.db.collection(this.modelName)
            .update( { userId : req.params.userId, assetType : req.params.type, 
                    $inc : { count : -1, totalSize : -data.size } }, res );
        req.db.collection(this.modelName)
            .update( { userId : req.params.userId, assetType : '_total', 
                    $inc : { count : -1, totalSize : -data.size } }, res );
    },

}
