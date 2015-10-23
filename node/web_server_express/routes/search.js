/****
 Assets Routing
****/

"use strict"

var assetController  = require('../controllers/assets')

module.exports = function (app) {

    app.get ( '/:userId/assets/:assetId/search/:name', assetController.search );
    app.get ( '/:userId/assets/search/:name', assetController.search );

}

