/****
 Assets Routing
****/

"use strict"

var assetController  = require('../controllers/assets')

module.exports = function (app) {

    app.get ( '/assets/:assetId/search/:name', assetController.search );
    app.get ( '/assets/search/:name', assetController.search );

}

