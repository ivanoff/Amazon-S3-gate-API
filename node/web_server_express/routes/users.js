/****
 Users Routing
****/

"use strict"

var userController  = require('../controllers/users')
var ERROR = require('config').get('ERRORS');

module.exports = function (app) {

    app.use('/users', function( req, res, next ){ 
                    if( !req.currentUser || req.currentUser.type != 'admin' )
                        return req.error( ERROR.ACCESS_DENIED )
                    else next();
            });

    app.get    ( '/users',         userController.getAllUsers );
    app.get    ( '/users/:userId', userController.getUserById );
    app.post   ( '/users',         userController.addUser     );
    app.put    ( '/users/:userId', userController.updateUser  );
    app.delete ( '/users/:userId', userController.removeUser  );

}

