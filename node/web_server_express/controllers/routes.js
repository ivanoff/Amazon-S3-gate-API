/****
 Main Routing
****/

module.exports = function (app) {

    require('./index')(app);
    require('./users')(app);

}

