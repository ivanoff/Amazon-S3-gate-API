/****
 Users Routing
****/
"use strict"
var userController  = require('../controllers/users')
var access = require('../lib/access');

module.exports = function (app) {

    app.use( '/users', access.onlyAdmin );

    app.get    ( '/users',         userController.getAllUsers );
    app.get    ( '/users/:userId', userController.getUserById );
    app.post   ( '/users',         userController.addUser     );
    app.put    ( '/users/:userId', userController.updateUser  );
    app.delete ( '/users/:userId', userController.removeUser  );

}

