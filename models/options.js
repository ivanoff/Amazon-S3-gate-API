"use strict"

var modelName = 'options';

var model = {
        '_id': { type: "uuid", required: true },
        userId: { type: "uuid", required: true },
        assetType: { type: "string", required: true },
        count: { type: "integer" },
        totalSize: { type: "integer" },
    };

module.exports = {

    modelName : modelName,

    getOptions : function( req, res ){
        req.db.collection(this.modelName).find( {} ).toArray( res );
    },

    getOptionsLimitByUser : function( req, data, res ){
        req.db.collection(this.modelName).find( {} ).toArray( res );
    },

}
