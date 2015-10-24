"use strict"

var modelName = 'options';

var model = {
        name: { type: "string", required: true },
        userType: { type: "string" },
        value: { type: "string" },
    };

module.exports = {

    modelName : modelName,

    getOptions : function( req, res ){
        var query = {};
        if( req.currentUser ) { query.userType = req.currentUser.type };
        req.db.collection(this.modelName).find( query ).toArray( res );
    },

    getOptionsByName : function( req, name, res ){
        var query = { name : name };
        if( req.currentUser ) { 
            query.userType = req.currentUser.type 
            req.db.collection(this.modelName).findOne( query, res );
        } else {
            req.db.collection(this.modelName).find( query ).toArray( res );
        }
    },

}
