/****
 Resources Routing
****/

"use strict"

var resourceController  = require('../controllers/resources');

module.exports = function (app) {

    app.get    ( '/users/:userId/resources',            resourceController.getResources       );
    app.get    ( '/users/:userId/resources/_total',     resourceController.getResourcesTotal  );
    app.get    ( '/users/:userId/resources/:assetType', resourceController.getResourcesByType );

}

