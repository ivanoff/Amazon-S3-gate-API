# S3 gate API documentation version v1
http://localhost:3000

---

## /login
Get token by user's login and password

### /login

* **post**: Get token by user's login and password

## /register
Register new guest user

### /register

* **post**: Register new guest user

## /me
Get information about user - owner of the provided token

### /me

* **get**: Get information about user - owner of the provided token

## /options
Get options of the user's group - owner of provided token

### /options

* **get**: Get options of the user's group - owner of provided token

## /assets
Work with assets ( files and folders )

### /assets

* **get**: Get list of assets in root directory
* **post**: add asset to root folder

### /assets/search/{name}
Search file and folder in whole storage

* **get**: Search file and folder in whole storage by {name} name

### /assets/{assetId}

* **get**: Get list of file and folder in {assetId} folder
* **post**: Add folder or upload file to {assetId} folder
* **put**: Change whole information about file/folder in {assetId} folder
* **patch**: Move {assetId} file/folder into {moveTo} folder
* **delete**: Delete {assetId} file or folder recursively

### /assets/{assetId}/content

* **get**: Download file or folder

### /assets/{assetId}/search/{name}
Search file and folder in {assetId} folder

* **get**: Search file and folder in {assetId} folder by name {name}

## /resources
Get information about used resources

### /resources

* **get**: Get information about all used resources

### /resources/{type}

* **get**: Get information about used resources by type {type}

## /users
Work with users ( admin only )

### /users

* **get**: Get list of all users
* **post**: Add user

### /users/{userId}

* **get**: Show information about {userId} user
* **put**: Change all information about {userId} user
* **patch**: Change part of information about {userId} user
* **delete**: Delete {userId} user

