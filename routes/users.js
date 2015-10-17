/****
 Users Routing
****/

"use strict"

var userController  = require('../controllers/users')

module.exports = function (app) {

    app.get    ( '/users',         userController.getAllUsers );
    app.get    ( '/users/:userId', userController.getUserById );
    app.post   ( '/users',         userController.addUser     );
    app.put    ( '/users/:userId', userController.updateUser  );
    app.delete ( '/users/:userId', userController.removeUser  );

}

