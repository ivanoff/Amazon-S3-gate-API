/****
 Resources Routing
****/

"use strict"

var resourceController  = require('../controllers/resources');

module.exports = function (app) {

    app.get    ( '/:userId/resources',       resourceController.getResources );
    app.get    ( '/:userId/resources/:type', resourceController.getResources );

}

