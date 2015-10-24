/****
 Resources Routing
****/
"use strict"

var resourceController  = require('../controllers/resources');

module.exports = function (app) {

    app.get    ( '/resources',       resourceController.getResources );
    app.get    ( '/resources/:type', resourceController.getResources );

}

