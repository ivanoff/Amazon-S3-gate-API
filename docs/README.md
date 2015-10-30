# S3 gate API


## What Is This?
-------------
Simple api for S3 Amazon file storage



## Install
-------------
```
git clone https://github.com/ivanoff/gl/
cd gl/node/web_server_express/install
./mongo_install {DB_URL} {DB_LOGIN} {DB_PASSWORD} {DB_DATABASE}
cd ../
```



## Usage
-------------
```
AWS_KEY={YOUR_AWS_KEY} AWS_SECRET={YOUR_AWS_SECRET} DB_URL=mongodb://{DB_LOGIN}:{DB_PASSWORD}@{DB_URL}/{DB_DATABASE} ./start_server
```
After start you can send requests to http://localhost:3000

** Default admin user's password is 'admin' **



## S3 gate API Main features
-------------

* Based on token authentication
* Access to following resources without access token: '/', '/login', '/register'
* Groups restricting access ( user and guest work only with assets )
* Limiting of groups resources. All parameters can be update in the database ( admin has no limit, user can upload 100 files or 10MB, guest can work with 3 files / 100Kb only )
* The ability to show all users from the database, add user, edit user's information or delete user from the database ( only admin group can )
* User will not be able to use token if admin detete this user from databse
* Everyone can get all information about himself, using registered token
* Everyone can add a folder to the root folder or one of the existing folders
* Everyone can upload file to the root folder or one of the existing folders. A file contains will uploaded to Amazon S3 in folder named by userId
* Everyone can get a list of files or folders in the root folder or in any existing folder.
* Everyone can get a file information
* Everyone can move any file or folders to another folder
* Everyone can view their resources ( information about count of all files and folders and files total size )
* It is possible to view resources for a specific type only.
* Everyone can download files and folders. Folders automaticly zipped to archive
* Only owner can download files and folders
* Everyone can delete their files and folders. Files will be deleted from S3 as well. The folder will delete recursively with all files/folders
* An unique resource name supports, based on userId, path and asset name
* Everyone can search files recursively
* The configuration file contains options for token creation, access AWS credentional, database parameters, path to logs, and list of all errors.
* Additional parameters, such as login / password to the database (DB_AUTH) and AWS's secret key (AWS_SECRET) must be specified in the global system variables, for example: AWS_SECRET = nnvF453223CRv DB_AUTH = gl: glpass ./start_server
* Logs are displayed on stdout and written to log files.



## S3 gate API documentation version v1
** You can find additional information, including raml file in docs/ folder **
-------------

### /login
Get token by user's login and password

#### /login

* **post**: Get token by user's login and password

### /register
Register new guest user

#### /register

* **post**: Register new guest user

### /me
Get information about user - owner of the provided token

#### /me

* **get**: Get information about user - owner of the provided token

### /options
Get options of the user's group - owner of provided token

#### /options

* **get**: Get options of the user's group - owner of provided token

### /assets
Work with assets ( files and folders )

#### /assets

* **get**: Get list of assets in root directory
* **post**: add asset to root folder

#### /assets/search/{name}
Search file and folder in whole storage

* **get**: Search file and folder in whole storage by {name} name

#### /assets/{assetId}

* **get**: Get list of file and folder in {assetId} folder
* **post**: Add folder or upload file to {assetId} folder
* **put**: Change whole information about file/folder in {assetId} folder
* **patch**: Move {assetId} file/folder into {moveTo} folder
* **delete**: Delete {assetId} file or folder recursively

#### /assets/{assetId}/content

* **get**: Download file or folder

#### /assets/{assetId}/search/{name}
Search file and folder in {assetId} folder

* **get**: Search file and folder in {assetId} folder by name {name}

### /resources
Get information about used resources

#### /resources

* **get**: Get information about all used resources

#### /resources/{type}

* **get**: Get information about used resources by type {type}

### /users
Work with users ( admin only )

#### /users

* **get**: Get list of all users
* **post**: Add user

#### /users/{userId}

* **get**: Show information about {userId} user
* **put**: Change all information about {userId} user
* **patch**: Change part of information about {userId} user
* **delete**: Delete {userId} user



## Command line examples

### Admin user examples

* Get token of admin user ( type: admin, login/password: admin/admin )
```
curl -H "Content-Type: application/json" -d '{"login":"admin","password":"admin"}' http://localhost:3000/login
{"token":"eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI","_links":{"self":{"href":"/me"},"assets":{"href":"/assets"},"resources":{"href":"/resources"}}}
```

* Add user
```
curl -H "Content-Type: application/json" -d '{"login":"user","password":"user","type":"user","email":"user@host.url","name":{"first":"User","last":""}}' http://localhost:3000/users -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI"
{"login":"user","password":"ee11cbb19052e40b07aac0ca060c23ee","type":"user","email":"user@host.url","name":{"first":"User","last":""},"_id":"5235125f-f45f-4306-b625-8bd4bbfb55ec","_usefulLink":"/users/5235125f-f45f-4306-b625-8bd4bbfb55ec","_usefulAssets":"/users/5235125f-f45f-4306-b625-8bd4bbfb55ec/assets","_usefulResources":"/users/5235125f-f45f-4306-b625-8bd4bbfb55ec/resources"}
```

* Get list of users
```
curl http://localhost:3000/users -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI"
[{"_id":"2a0722fd-88b4-430f-928f-94f512676e4b","login":"admin","password":"21232f297a57a5a743894a0e4a801fc3","type":"admin","email":"admin@localhost","name":{"first":"Admin","last":""}},{"_id":"5235125f-f45f-4306-b625-8bd4bbfb55ec","login":"user","password":"ee11cbb19052e40b07aac0ca060c23ee","type":"user","email":"user@host.url","name":{"first":"User","last":""}}]
```

* Update user
```
## check under admin if we have user e2a39a50-6898-469c-a596-80f200ee3fe6
curl http://localhost:3000/users/e2a39a50-6898-469c-a596-80f200ee3fe6 -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI"
{"_id":"e2a39a50-6898-469c-a596-80f200ee3fe6","login":"guest","password":"084e0343a0486ff05530df6c705c8bb4","type":"guest","email":"guest@host.url","name":{"first":"Guest","last":""}}

## replace the whole user e2a39a50-6898-469c-a596-80f200ee3fe6 ( PUT )
curl -H "Content-Type: application/json" -d '{"login":"anatoly","password":"jo","type":"guest","email":"anatol@host.url","name":{"first":"Anatoly","last":"Jovanny"}}' http://localhost:3000/users/e2a39a50-6898-469c-a596-80f200ee3fe6 -X PUT -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI"
{"_id":"e2a39a50-6898-469c-a596-80f200ee3fe6","login":"anatoly","password":"674f33841e2309ffdd24c85dc3b999de","type":"guest","email":"anatol@host.url","name":{"first":"Anatoly","last":"Jovanny"}}

## replace only one field 'type' of user e2a39a50-6898-469c-a596-80f200ee3fe6 ( PATCH )
curl -H "Content-Type: application/json" -d '{"type":"admin"}' http://localhost:3000/users/e2a39a50-6898-469c-a596-80f200ee3fe6 -X PATCH -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI"
{"_id":"e2a39a50-6898-469c-a596-80f200ee3fe6","login":"anatoly","password":"674f33841e2309ffdd24c85dc3b999de","type":"admin","email":"anatol@host.url","name":{"first":"Anatoly","last":"Jovanny"}}

## get token of this user
curl -H "Content-Type: application/json" -d '{"login":"anatoly","password":"jo"}' http://localhost:3000/login
{"token":"eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"}

## right not user e2a39a50-6898-469c-a596-80f200ee3fe6 can view what admin can view, 'cause of 'admin' type
curl http://localhost:3000/users/2a0722fd-88b4-430f-928f-94f512676e4b -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
{"_id":"2a0722fd-88b4-430f-928f-94f512676e4b","login":"admin","password":"21232f297a57a5a743894a0e4a801fc3","type":"admin","email":"admin@localhost","name":{"first":"Admin","last":""}}
```


* Delete user
```
curl http://localhost:3000/users/353e6dbf-9a03-4a07-813d-b6fee5b9411b -X DELETE -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI"
{"ok":1,"_id":"353e6dbf-9a03-4a07-813d-b6fee5b9411b"}
```

* Check options
```
curl http://localhost:3000/options -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI"
[{"_id":"562b783ee63db5e165879707","name":"limit.files","userType":"user","value":100},{"_id":"562b783ee63db5e165879708","name":"limit.files","userType":"guest","value":3},{"_id":"562b783ee63db5e165879709","name":"limit.size","userType":"user","value":10000000},{"_id":"562b783ee63db5e16587970a","name":"limit.size","userType":"guest","value":100000}]
```


### User examples

* Get token of user ( type: admin, login/password: admin/admin )
```
curl -H "Content-Type: application/json" -d '{"login":"user","password":"user"}' http://localhost:3000/login
{"token":"eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"}
```

* Get full information about token owner user
```
curl http://localhost:3000/me -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
{"options":[{"_id":"562b783ee63db5e165879707","name":"limit.files","userType":"user","value":100},{"_id":"562b783ee63db5e165879709","name":"limit.size","userType":"user","value":10000000}],"user":{"_id":"5235125f-f45f-4306-b625-8bd4bbfb55ec","login":"user","password":"ee11cbb19052e40b07aac0ca060c23ee","type":"user","email":"user@host.url","name":{"first":"User","last":""}},"resources":{"_id":"562b7aa591b9cd0b3a17e77b","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","assetType":"_total","count":0,"totalSize":0}}
```

* Add folder to root folder
```
curl -H "Content-Type: application/json" -d '{"name":"video"}' http://localhost:3000/assets -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
{"name":"video","_id":"098d07e8-9712-4499-be5f-f49145b937bc","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"folder","path":"","size":0}
```

* Add folder to another folder
```
curl -H "Content-Type: application/json" -d '{"name":"images"}' http://localhost:3000/assets/098d07e8-9712-4499-be5f-f49145b937bc -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
{"name":"images","_id":"3577a338-4424-4fec-88ff-13a10b1b6303","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"folder","path":"/video","parentId":"098d07e8-9712-4499-be5f-f49145b937bc","size":0}
```

* Upload file to folder
```
curl -F "file=@/tmp/temp/images.jpeg" http://localhost:3000/assets/098d07e8-9712-4499-be5f-f49145b937bc -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
{"_id":"60d7ab5b-d6ed-4c7e-905e-ac216bae85b1","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"image","name":"images.jpeg","size":9375,"path":"/video","parentId":"098d07e8-9712-4499-be5f-f49145b937bc"}
```

* List all files in root folder
```
curl http://localhost:3000/assets -H "x-access-token: eyJhbGciOI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
[{"_id":"098d07e8-9712-4499-be5f-f49145b937bc","name":"video","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"folder","path":"","size":0}]
```

* List all files in folder
```
curl http://localhost:3000/assets/098d07e8-9712-4499-be5f-f49145b937bc -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
[{"_id":"3577a338-4424-4fec-88ff-13a10b1b6303","name":"images","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"folder","path":"/video","parentId":"098d07e8-9712-4499-be5f-f49145b937bc","size":0},{"_id":"60d7ab5b-d6ed-4c7e-905e-ac216bae85b1","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"image","name":"images.jpeg","size":9375,"path":"/video","parentId":"098d07e8-9712-4499-be5f-f49145b937bc"}]
```

* Property of file
```
curl http://localhost:3000/assets/60d7ab5b-d6ed-4c7e-905e-ac216bae85b1 -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
{"_id":"60d7ab5b-d6ed-4c7e-905e-ac216bae85b1","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"image","name":"images.jpeg","size":9375,"path":"/video","parentId":"098d07e8-9712-4499-be5f-f49145b937bc"}
```

* Download file
```
curl http://localhost:3000/assets/60d7ab5b-d6ed-4c7e-905e-ac216bae85b1/content -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
<binary_data>
```

* Download folder
```
curl http://localhost:3000/assets/098d07e8-9712-4499-be5f-f49145b937bc/content -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
<binary_data>
```

* Move file/folder
```
## there is 2 assets in a folder: 1 file and 1 folder
curl http://localhost:3000/assets/715490af-2e04-4595-b58e-b4a399daf49c -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
[{"_id":"4a2140f8-a710-4bbc-a07b-c971f92b8665","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":"/test3/test4","parentId":"715490af-2e04-4595-b58e-b4a399daf49c"},{"_id":"a45f1e72-a543-461f-86a0-2e0e53a56406","name":"test5","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"folder","path":"/test3/test4","parentId":"715490af-2e04-4595-b58e-b4a399daf49c","size":0}]

## move file 4a2140f8-a710-4bbc-a07b-c971f92b8665 to folder a45f1e72-a543-461f-86a0-2e0e53a56406
curl http://localhost:3000/assets/4a2140f8-a710-4bbc-a07b-c971f92b8665 -H "Content-Type: application/json" -d '{"moveTo":"a45f1e72-a543-461f-86a0-2e0e53a56406"}' -X PATCH -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
{"_id":"4a2140f8-a710-4bbc-a07b-c971f92b8665","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":"/test3/test4","parentId":"715490af-2e04-4595-b58e-b4a399daf49c"}

## check again: 1 file gone
curl http://localhost:3000/assets/715490af-2e04-4595-b58e-b4a399daf49c -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
[{"_id":"a45f1e72-a543-461f-86a0-2e0e53a56406","name":"test5","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"folder","path":"/test3/test4","parentId":"715490af-2e04-4595-b58e-b4a399daf49c","size":0}]

## this file moved in to folder a45f1e72-a543-461f-86a0-2e0e53a56406
curl http://localhost:3000/assets/a45f1e72-a543-461f-86a0-2e0e53a56406 -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
[{"_id":"4a2140f8-a710-4bbc-a07b-c971f92b8665","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":"/test3/test4/test5","parentId":"a45f1e72-a543-461f-86a0-2e0e53a56406"}]
```

* Global searching file
```
curl http://localhost:3000/assets/search/jpeg -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
[{"_id":"048ff404-e56e-483d-b4c0-4ee67d6cf924","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":""},{"_id":"c5019590-ee4d-4655-9d17-e4aa8ff3dfe1","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images2.jpeg","size":9375,"path":""},{"_id":"13474ecc-15fc-4dc6-b51c-14812138a3d2","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"index.jpeg","size":13128,"path":""},{"_id":"deb441bb-20fb-451d-b21d-8958eb35de0b","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":"/test","parentId":"7cd02b1d-e76c-4343-802c-bccb94ff6473"}]
```

* Search file in a folder recursively
```
curl http://localhost:3000/assets/7cd02b1d-e76c-4343-802c-bccb94ff6473/search/jpeg -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
[{"_id":"deb441bb-20fb-451d-b21d-8958eb35de0b","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":"/test","parentId":"7cd02b1d-e76c-4343-802c-bccb94ff6473"}]
```

* Check user's resources
```
curl http://localhost:3000/resources -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
[{"_id":"562b7aa591b9cd0b3a17e77b","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","assetType":"_total","count":3,"totalSize":9375},{"_id":"562b7d3991b9cd0b3a17e77c","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","assetType":"folder","count":2,"totalSize":0},{"_id":"562b885f4d477fd040547cc6","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","assetType":"image","count":1,"totalSize":9375}]
```

* Check user's image resources
```
curl http://localhost:3000/resources/image -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
{"_id":"562b885f4d477fd040547cc6","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","assetType":"image","count":1,"totalSize":9375}
```

* Delete file
```
curl http://localhost:3000/assets/60d7ab5b-d6ed-4c7e-905e-ac216bae85b1 -X DELETE -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
{"ok":1,"_id":"60d7ab5b-d6ed-4c7e-905e-ac216bae85b1"}
```

* Delete folder
```
curl http://localhost:3000/assets/098d07e8-9712-4499-be5f-f49145b937bc -X DELETE -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI"
{"ok":1,"_id":"098d07e8-9712-4499-be5f-f49145b937bc"}
```


### Guest examples

* Register guest user
```
curl -H "Content-Type: application/json" -d '{"login":"guest","password":"guest","type":"admin","email":"guest@host.url","name":{"first":"Guest","last":""}}' http://localhost:3000/register
{"login":"guest","password":"084e0343a0486ff05530df6c705c8bb4","type":"guest","email":"guest@host.url","name":{"first":"Guest","last":""},"_id":"e2a39a50-6898-469c-a596-80f200ee3fe6","_usefulLink":"/users/e2a39a50-6898-469c-a596-80f200ee3fe6","_usefulAssets":"/users/e2a39a50-6898-469c-a596-80f200ee3fe6/assets","_usefulResources":"/users/e2a39a50-6898-469c-a596-80f200ee3fe6/resources"}
```

* Get token for guest ( type: guest, login/password: guest/guest )
```
curl -H "Content-Type: application/json" -d '{"login":"guest","password":"guest"}' http://localhost:3000/login
{"token":"eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"}
```

* Upload one small file by guest
```
curl -F "file=@/tmp/temp/images.jpeg" http://localhost:3000/assets -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
{"_id":"048ff404-e56e-483d-b4c0-4ee67d6cf924","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":""}
```

* Check if it can be downloaded
```
curl http://localhost:3000/assets/048ff404-e56e-483d-b4c0-4ee67d6cf924/content -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
<binary_data>
```

* Check if it can be downloaded by other user
```
curl http://localhost:3000/assets/048ff404-e56e-483d-b4c0-4ee67d6cf924/content -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
<binary_data>
```

* Check guest's options/limits
```
curl http://localhost:3000/options -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
[{"_id":"562b783ee63db5e165879708","name":"limit.files","userType":"guest","value":3},{"_id":"562b783ee63db5e16587970a","name":"limit.size","userType":"guest","value":100000}]
```

* Check guest's used space
```
curl http://localhost:3000/resources/_total -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
{"_id":"562b90fd612ebc04469b1201","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","assetType":"_total","count":1,"totalSize":9375}
```


### Warnings and errors examples

### Access / Authorization / Tokens

* 21 - Acess denied
```
curl http://localhost:3000/users -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
{"code":"21","message":"Acess denied","developerMessage":"Acess to this resource is denied. You can contact administrator in case of mistake.","url":"https://doc.site.url/errors/21","status":"403"}
```

* 91 - Unauthorized
```
curl http://localhost:3000/users
{"code":"91","message":"Unauthorized","developerMessage":"No token provided. Please POST login and password to /login to get token","url":"https://doc.site.url/errors/91","status":"401"}
```

* 92 - Bad token
```
curl http://localhost:3000/users -H "x-access-token: eyJhbG"
{"code":"92","message":"Bad token","developerMessage":"Provided token not accesable. Please, POST login and password to /login to get actual token","url":"https://doc.site.url/errors/92","status":"401"}
```

* 93 - Token to old
```
curl -H "Content-Type: application/json" -d '{"login":"superuser","password":"123","type":"root","email":"guest@host2.url","name":{"first":"ADMIN","last":""}}' http://localhost:3000/register
{"login":"superuser","password":"202cb962ac59075b964b07152d234b70","type":"guest","email":"guest@host2.url","name":{"first":"ADMIN","last":""},"_id":"353e6dbf-9a03-4a07-813d-b6fee5b9411b","_usefulLink":"/users/353e6dbf-9a03-4a07-813d-b6fee5b9411b","_usefulAssets":"/users/353e6dbf-9a03-4a07-813d-b6fee5b9411b/assets","_usefulResources":"/users/353e6dbf-9a03-4a07-813d-b6fee5b9411b/resources"}
curl -H "Content-Type: application/json" -d '{"login":"superuser","password":"123"}' http://localhost:3000/login
{"token":"eyJhbGciOiJIUzI1NiJ9.MzUzZTZkYmYtOWEwMy00YTA3LTgxM2QtYjZmZWU1Yjk0MTFi.BqF8Rvd16_CPGxOXPrpV_DOaIWBCQOhkcBRaJk7DoQc"}
curl http://localhost:3000/options -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MzUzZTZkYmYtOWEwMy00YTA3LTgxM2QtYjZmZWU1Yjk0MTFi.BqF8Rvd16_CPGxOXPrpV_DOaIWBCQOhkcBRaJk7DoQc"
[{"_id":"562b783ee63db5e165879708","name":"limit.files","userType":"guest","value":3},{"_id":"562b783ee63db5e16587970a","name":"limit.size","userType":"guest","value":100000}]

curl http://localhost:3000/users/353e6dbf-9a03-4a07-813d-b6fee5b9411b -X DELETE -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI"
{"ok":1,"_id":"353e6dbf-9a03-4a07-813d-b6fee5b9411b"}

curl http://localhost:3000/options -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MzUzZTZkYmYtOWEwMy00YTA3LTgxM2QtYjZmZWU1Yjk0MTFi.BqF8Rvd16_CPGxOXPrpV_DOaIWBCQOhkcBRaJk7DoQc"
{"code":"93","message":"Token to old","developerMessage":"Provided token is to old. Please, POST login and password to /login to get actual token","url":"https://doc.site.url/errors/93","status":"403"}
```

### Duplicate key error index

* 3 - Server error
```
curl -H "Content-Type: application/json" -d '{"login":"superuser","password":"123","type":"root","email":"guest@host.url","name":{"first":"ADMIN","last":""}}' http://localhost:3000/register
{"code":"3","message":"Server error","url":"https://doc.site.url/errors/3","status":"500","developerMessage":{"code":11000,"index":0,"errmsg":"E11000 duplicate key error index: gl.users.$email_1 dup key: { : \"guest@host.url\" }","op":{"login":"superuser","password":"202cb962ac59075b964b07152d234b70","type":"guest","email":"guest@host.url","name":{"first":"ADMIN","last":""},"_id":"bde72fb5-e2e9-4703-916c-8121d9140d68"}}}
```


### Uploads overlimits

* 212 - Total size limit
```
curl -F "file=@/tmp/temp/gv_0402_newspicofday_0011.jpg" http://localhost:3000/assets -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
{"code":"212","message":"Total size limit reached","developerMessage":"There is no space to store user's file. You can delete some files to free some space or upgrade your account to incrase your storage limits","url":"https://doc.site.url/errors/212","status":"409"}
```

* 213 - Total count files limit
```
curl -F "file=@/tmp/temp/images3.jpeg" http://localhost:3000/assets -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"
{"code":"213","message":"Total count files limit reached","developerMessage":"Count of all files is equal to count files limit. You can delete one file to store this file or upgrade your account to incrase your storage limits","url":"https://doc.site.url/errors/213","status":"409"}
```



## MongoDB schemas
-------------

### users collection
```
{
  '_id'    : { type: "uuid"   },
  login    : { type: "string" },
  password : { type: "md5"    },
  type     : { type: "string" },
  name : {
      first: { type: "string" },
      last : { type: "string" },
  },
  email    : { type: "string" },
  metadata : { type: "object" }
}
```
unique index: ** login **
unique index: ** email **

### assets collection
```
{
  '_id'    : { type: "uuid"   },
  userId   : { type: "uuid"   },
  path     : { type: "string" },
  name     : { type: "string" },
  type     : { type: "string" },
  size     : { type: "integer"},
  parentId : { type: "string" }
}
```
unique index: ** userId, path, name **


### resources collection
```
{
  '_id'    : { type: "uuid"   },
  userId   : { type: "uuid"   },
  assetType: { type: "string" },
  count    : { type: "integer"},
  totalSize: { type: "integer"}
}
```
unique index: ** userId, assetType **


### options collection
```
{
  '_id'    : { type: "uuid"   },
  name     : { type: "string" },
  userType : { type: "string" },
  value    : { type: "string" }
}
```
unique index: ** name, userType **



## List of errors
-------------
There is a count of errors that can be encountered. All these errors are in config file.
  * 21 - Acess denied 
  * 91 - Unauthorized 
  * 92 - Bad token 
  * 93 - Token to old 
  * 121 - User not found
  * 122 - No users found
  * 131 - Asset not found
  * 132 - No assets found
  * 133 - Asset is not folder
  * 134 - Asset exists
  * 142 - No options found
  * 212 - Total size limit reached
  * 213 - Total count files limit reached



## License
-------------
S3 GATE is available under the MIT license. See the LICENSE file for more info.



## Created by
-------------
Dimitry, 2@ivanoff.org.ua .$ curl -A cv ivanoff.org.ua

