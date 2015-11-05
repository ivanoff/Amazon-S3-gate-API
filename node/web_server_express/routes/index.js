/****
 Index Routing
****/
"use strict"

var indexController = require('../controllers/index')

module.exports = function (app) {

    app.get( '/', indexController.getIndex );

}

