/****
 Assets Routing
****/
"use strict"

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var assetController  = require('../controllers/assets')

module.exports = function (app) {

    app.get    ( '/assets',          assetController.getRootAssets );
    app.get    ( '/assets/:assetId', assetController.getAssetById  );
    app.get    ( '/assets/:assetId/content', assetController.getAssetContentById  );
    app.post   ( '/assets',          multipartMiddleware, assetController.addAsset );
    app.post   ( '/assets/:assetId', multipartMiddleware, assetController.addAsset );
    app.put    ( '/assets/:assetId', assetController.updateAsset   );
    app.patch  ( '/assets/:assetId/:folderId', assetController.moveAssetToFolder);
    app.delete ( '/assets/:assetId', assetController.removeAsset   );

}

