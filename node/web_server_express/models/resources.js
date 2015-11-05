"use strict"

var modelName = 'resources';

// model to validate
var model = {
        '_id': { type: "uuid", required: true },
        userId: { type: "uuid", required: true },
        assetType: { type: "string", required: true },
        count: { type: "integer" },
        totalSize: { type: "integer" },
    };

module.exports = {

    modelName : modelName,

    initResources : function( req, data, res ){
        req.db.collection(this.modelName)
            .insert( { userId : data['_id'], assetType : '_total', count : 0, totalSize : 0 }, res );
    },

    getResources : function( req, res ){
        if( req.params.type ) return this.getResourcesByType( req, req.params.type, res);
        req.db.collection(this.modelName).find( { userId : req.currentUser._id } ).toArray( res );

    },

    getResourcesByType : function( req, type, res ){
        req.db.collection(this.modelName).findOne( { userId : req.currentUser._id, assetType : type }, res );
    },

    updateResources : function( req, data, count, res ){
        if ( !data ) return res();
        if( !data.type ) data.type = '';
        if( !data.size ) data.size = 0;
        if( count < 0  ) data.size = -data.size;

        req.db.collection(this.modelName)
            .findOne( { userId : req.currentUser._id, assetType : data.type },
            function( err, doc ){
                if ( !doc ) {
                    req.db.collection(this.modelName)
                        .insert( { userId : data.userId, assetType : data.type, 
                                    count : count, totalSize : data.size }, res );
                } else {
                    req.db.collection(this.modelName)
                        .updateOne( { userId : data.userId, assetType : data.type }, 
                                { $inc : { count : count, totalSize : data.size } }, res );
                }
            }.bind(this) );

        req.db.collection(this.modelName)
            .updateOne( { userId : req.currentUser._id, assetType : '_total'}, 
                { $inc : { count : count, totalSize : data.size } }, res );
    },

}
