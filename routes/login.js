/****
 Login Routing
****/
"use strict"

var loginController = require('../controllers/login');

module.exports = function (app) {

    app.post( '/login', loginController.login );
    app.use ( loginController.middleWare );

};