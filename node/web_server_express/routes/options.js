/****
 Users Routing
****/
"use strict"
var optionsController  = require('../controllers/options')
var access = require('../lib/access');

module.exports = function (app) {

    app.use( '/options', access.onlyAdmin );

    app.get( '/options', optionsController.getAllOptions );

}

