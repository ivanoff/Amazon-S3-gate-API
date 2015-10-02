/****
 Main Routing
****/

"use strict"

module.exports = function (app) {

    require('./index')(app);
    require('./users')(app);

}

