/****
 Assets Routing
****/

"use strict"

var assetController  = require('../controllers/assets')

module.exports = function (app) {

    app.get ( '/users/:userId/assets/:assetId/search/:name', assetController.search );
    app.get ( '/users/:userId/assets/search/:name', assetController.search );

}

