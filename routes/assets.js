/****
 Assets Routing
****/

"use strict"

var assetController  = require('../controllers/assets')

module.exports = function (app) {

    app.get    ( '/users/:id/assets',     assetController.getAllAssets );
    app.get    ( '/users/:id/assets/:id', assetController.getAssetById );
    app.post   ( '/users/:id/assets',     assetController.addAsset     );
    app.post   ( '/users/:id/assets/:id', assetController.updateAsset  );
    app.delete ( '/users/:id/assets/:id', assetController.deleteAsset  );

}

