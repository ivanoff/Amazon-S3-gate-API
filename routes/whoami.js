/****
 WhoAmI Routing
****/
"use strict"
var whoamiController  = require('../controllers/whoami')
var access = require('../lib/access');

module.exports = function (app) {

    app.use( '/whoami', access.onlyRegistered );

    app.get( '/whoami', whoamiController.whoami );

}

