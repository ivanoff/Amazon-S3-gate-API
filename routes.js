/****
 Main Routing
****/

"use strict"

var indexController = require('./controllers/index')
var userController  = require('./controllers/users')

module.exports = function (app) {

    app.get( '/', indexController.getIndex );

    app.get    ( '/users',     userController.getAllUsers );
    app.get    ( '/users/:id', userController.getUserById );
    app.post   ( '/users',     userController.addUser     );
    app.post   ( '/users/:id', userController.updateUser  );
    app.delete ( '/users/:id', userController.deleteUser  );

}

