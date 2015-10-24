/****
 Me Routing
****/
"use strict"
var meController  = require('../controllers/me')
var access = require('../lib/access');

module.exports = function (app) {

    app.use( '/me', access.onlyRegistered );

    app.get( '/me', meController.me );

}

