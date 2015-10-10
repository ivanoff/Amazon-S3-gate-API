/****
 Assets Routing
****/

"use strict"

var assetController  = require('../controllers/assets')

module.exports = function (app) {

    app.get    ( '/users/:userId/assets',          assetController.getRootAssets );
    app.get    ( '/users/:userId/assets/:assetId', assetController.getAssetById  );
    app.post   ( '/users/:userId/assets',          assetController.addAsset      );
    app.post   ( '/users/:userId/assets/:assetId', assetController.updateAsset   );
    app.delete ( '/users/:userId/assets/:assetId', assetController.deleteAsset   );

}

