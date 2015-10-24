/****
 Login Routing
****/
"use strict"
var registerController = require('../controllers/register');

module.exports = function (app) {

    app.post( '/register', registerController.registerGuest );

};