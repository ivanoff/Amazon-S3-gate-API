
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




# Command line examples

### Admin user examples

* Get token of admin user ( type: admin, login/password: admin/admin )
```
curl -H "Content-Type: application/json" -d '{"login":"admin","password":"admin"}' http://localhost:3000/login
{"token":"eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI","_links":{"self":{"href":"/me"},"assets":{"href":"/assets"},"resources":{"href":"/resources"}}}
```

* Add user
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI" -H "Content-Type: application/json" -d '{"login":"user","password":"user","type":"user","email":"user@host.url","name":{"first":"User","last":""}}' http://localhost:3000/users
{"login":"user","password":"ee11cbb19052e40b07aac0ca060c23ee","type":"user","email":"user@host.url","name":{"first":"User","last":""},"_id":"5235125f-f45f-4306-b625-8bd4bbfb55ec","_usefulLink":"/users/5235125f-f45f-4306-b625-8bd4bbfb55ec","_usefulAssets":"/users/5235125f-f45f-4306-b625-8bd4bbfb55ec/assets","_usefulResources":"/users/5235125f-f45f-4306-b625-8bd4bbfb55ec/resources"}
```

* Get list of users
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI" http://localhost:3000/users
[{"_id":"2a0722fd-88b4-430f-928f-94f512676e4b","login":"admin","password":"21232f297a57a5a743894a0e4a801fc3","type":"admin","email":"admin@localhost","name":{"first":"Admin","last":""}},{"_id":"5235125f-f45f-4306-b625-8bd4bbfb55ec","login":"user","password":"ee11cbb19052e40b07aac0ca060c23ee","type":"user","email":"user@host.url","name":{"first":"User","last":""}}]
```

* Update user
```
# check under admin if we have user e2a39a50-6898-469c-a596-80f200ee3fe6
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI" http://localhost:3000/users/e2a39a50-6898-469c-a596-80f200ee3fe6
{"_id":"e2a39a50-6898-469c-a596-80f200ee3fe6","login":"guest","password":"084e0343a0486ff05530df6c705c8bb4","type":"guest","email":"guest@host.url","name":{"first":"Guest","last":""}}

# replace the whole user e2a39a50-6898-469c-a596-80f200ee3fe6 ( PUT )
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI" -H "Content-Type: application/json" -d '{"login":"anatoly","password":"jo","type":"guest","email":"anatol@host.url","name":{"first":"Anatoly","last":"Jovanny"}}' http://localhost:3000/users/e2a39a50-6898-469c-a596-80f200ee3fe6 -X PUT
{"_id":"e2a39a50-6898-469c-a596-80f200ee3fe6","login":"anatoly","password":"674f33841e2309ffdd24c85dc3b999de","type":"guest","email":"anatol@host.url","name":{"first":"Anatoly","last":"Jovanny"}}

# replace only one field 'type' of user e2a39a50-6898-469c-a596-80f200ee3fe6 ( PATCH )
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI" -H "Content-Type: application/json" -d '{"type":"admin"}' http://localhost:3000/users/e2a39a50-6898-469c-a596-80f200ee3fe6 -X PATCH
{"_id":"e2a39a50-6898-469c-a596-80f200ee3fe6","login":"anatoly","password":"674f33841e2309ffdd24c85dc3b999de","type":"admin","email":"anatol@host.url","name":{"first":"Anatoly","last":"Jovanny"}}

# get token of this user
curl -H "Content-Type: application/json" -d '{"login":"anatoly","password":"jo"}' http://localhost:3000/login
{"token":"eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64"}

# right not user e2a39a50-6898-469c-a596-80f200ee3fe6 can view what admin can view, 'cause of 'admin' type
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/users/2a0722fd-88b4-430f-928f-94f512676e4b
{"_id":"2a0722fd-88b4-430f-928f-94f512676e4b","login":"admin","password":"21232f297a57a5a743894a0e4a801fc3","type":"admin","email":"admin@localhost","name":{"first":"Admin","last":""}}
```


* Delete user
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI" http://localhost:3000/users/353e6dbf-9a03-4a07-813d-b6fee5b9411b -X DELETE
{"ok":1,"_id":"353e6dbf-9a03-4a07-813d-b6fee5b9411b"}
```

* Check options
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI" http://localhost:3000/options
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
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" http://localhost:3000/me
{"options":[{"_id":"562b783ee63db5e165879707","name":"limit.files","userType":"user","value":100},{"_id":"562b783ee63db5e165879709","name":"limit.size","userType":"user","value":10000000}],"user":{"_id":"5235125f-f45f-4306-b625-8bd4bbfb55ec","login":"user","password":"ee11cbb19052e40b07aac0ca060c23ee","type":"user","email":"user@host.url","name":{"first":"User","last":""}},"resources":{"_id":"562b7aa591b9cd0b3a17e77b","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","assetType":"_total","count":0,"totalSize":0}}
```

* Add folder to root folder
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" -H "Content-Type: application/json" -d '{"name":"video"}' http://localhost:3000/assets
{"name":"video","_id":"098d07e8-9712-4499-be5f-f49145b937bc","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"folder","path":"","size":0}
```

* Add folder to another folder
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" -H "Content-Type: application/json" -d '{"name":"images"}' http://localhost:3000/assets/098d07e8-9712-4499-be5f-f49145b937bc
{"name":"images","_id":"3577a338-4424-4fec-88ff-13a10b1b6303","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"folder","path":"/video","parentId":"098d07e8-9712-4499-be5f-f49145b937bc","size":0}
```

* Upload file to folder
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" -F "file=@/tmp/temp/images.jpeg" http://localhost:3000/assets/098d07e8-9712-4499-be5f-f49145b937bc
{"_id":"60d7ab5b-d6ed-4c7e-905e-ac216bae85b1","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"image","name":"images.jpeg","size":9375,"path":"/video","parentId":"098d07e8-9712-4499-be5f-f49145b937bc"}
```

* List all files in root folder
```
curl -H "x-access-token: eyJhbGciOI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" http://localhost:3000/assets
[{"_id":"098d07e8-9712-4499-be5f-f49145b937bc","name":"video","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"folder","path":"","size":0}]
```

* List all files in folder
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" http://localhost:3000/assets/098d07e8-9712-4499-be5f-f49145b937bc
[{"_id":"3577a338-4424-4fec-88ff-13a10b1b6303","name":"images","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"folder","path":"/video","parentId":"098d07e8-9712-4499-be5f-f49145b937bc","size":0},{"_id":"60d7ab5b-d6ed-4c7e-905e-ac216bae85b1","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"image","name":"images.jpeg","size":9375,"path":"/video","parentId":"098d07e8-9712-4499-be5f-f49145b937bc"}]
```

* Property of file
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" http://localhost:3000/assets/60d7ab5b-d6ed-4c7e-905e-ac216bae85b1
{"_id":"60d7ab5b-d6ed-4c7e-905e-ac216bae85b1","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","type":"image","name":"images.jpeg","size":9375,"path":"/video","parentId":"098d07e8-9712-4499-be5f-f49145b937bc"}
```

* Download file
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" http://localhost:3000/assets/60d7ab5b-d6ed-4c7e-905e-ac216bae85b1/content
<binary_data>
```

* Download folder
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" http://localhost:3000/assets/098d07e8-9712-4499-be5f-f49145b937bc/content
<binary_data>
```

* Move file/folder
```
# there is 2 assets in a folder: 1 file and 1 folder
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/assets/715490af-2e04-4595-b58e-b4a399daf49c
[{"_id":"4a2140f8-a710-4bbc-a07b-c971f92b8665","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":"/test3/test4","parentId":"715490af-2e04-4595-b58e-b4a399daf49c"},{"_id":"a45f1e72-a543-461f-86a0-2e0e53a56406","name":"test5","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"folder","path":"/test3/test4","parentId":"715490af-2e04-4595-b58e-b4a399daf49c","size":0}]

# move file 4a2140f8-a710-4bbc-a07b-c971f92b8665 to folder a45f1e72-a543-461f-86a0-2e0e53a56406
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/assets/4a2140f8-a710-4bbc-a07b-c971f92b8665 -H "Content-Type: application/json" -d '{"moveTo":"a45f1e72-a543-461f-86a0-2e0e53a56406"}' -X PATCH
{"_id":"4a2140f8-a710-4bbc-a07b-c971f92b8665","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":"/test3/test4","parentId":"715490af-2e04-4595-b58e-b4a399daf49c"}

# check again: 1 file gone
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/assets/715490af-2e04-4595-b58e-b4a399daf49c
[{"_id":"a45f1e72-a543-461f-86a0-2e0e53a56406","name":"test5","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"folder","path":"/test3/test4","parentId":"715490af-2e04-4595-b58e-b4a399daf49c","size":0}]

# this file moved in to folder a45f1e72-a543-461f-86a0-2e0e53a56406
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/assets/a45f1e72-a543-461f-86a0-2e0e53a56406
[{"_id":"4a2140f8-a710-4bbc-a07b-c971f92b8665","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":"/test3/test4/test5","parentId":"a45f1e72-a543-461f-86a0-2e0e53a56406"}]
```

* Global searching file
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/assets/search/jpeg
[{"_id":"048ff404-e56e-483d-b4c0-4ee67d6cf924","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":""},{"_id":"c5019590-ee4d-4655-9d17-e4aa8ff3dfe1","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images2.jpeg","size":9375,"path":""},{"_id":"13474ecc-15fc-4dc6-b51c-14812138a3d2","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"index.jpeg","size":13128,"path":""},{"_id":"deb441bb-20fb-451d-b21d-8958eb35de0b","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":"/test","parentId":"7cd02b1d-e76c-4343-802c-bccb94ff6473"}]
```

* Search file in a folder recursively
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/assets/7cd02b1d-e76c-4343-802c-bccb94ff6473/search/jpeg
[{"_id":"deb441bb-20fb-451d-b21d-8958eb35de0b","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":"/test","parentId":"7cd02b1d-e76c-4343-802c-bccb94ff6473"}]
```

* Check user's resources
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" http://localhost:3000/resources
[{"_id":"562b7aa591b9cd0b3a17e77b","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","assetType":"_total","count":3,"totalSize":9375},{"_id":"562b7d3991b9cd0b3a17e77c","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","assetType":"folder","count":2,"totalSize":0},{"_id":"562b885f4d477fd040547cc6","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","assetType":"image","count":1,"totalSize":9375}]
```

* Check user's image resources
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" http://localhost:3000/resources/image
{"_id":"562b885f4d477fd040547cc6","userId":"5235125f-f45f-4306-b625-8bd4bbfb55ec","assetType":"image","count":1,"totalSize":9375}
```

* Delete file
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" http://localhost:3000/assets/60d7ab5b-d6ed-4c7e-905e-ac216bae85b1 -X DELETE
{"ok":1,"_id":"60d7ab5b-d6ed-4c7e-905e-ac216bae85b1"}
```

* Delete folder
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" http://localhost:3000/assets/098d07e8-9712-4499-be5f-f49145b937bc -X DELETE
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
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" -F "file=@/tmp/temp/images.jpeg" http://localhost:3000/assets
{"_id":"048ff404-e56e-483d-b4c0-4ee67d6cf924","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","type":"image","name":"images.jpeg","size":9375,"path":""}
```

* Check if it can be downloaded
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/assets/048ff404-e56e-483d-b4c0-4ee67d6cf924/content
<binary_data>
```

* Check if it can be downloaded by other user
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/assets/048ff404-e56e-483d-b4c0-4ee67d6cf924/content
<binary_data>
```

* Check guest's options/limits
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/options
[{"_id":"562b783ee63db5e165879708","name":"limit.files","userType":"guest","value":3},{"_id":"562b783ee63db5e16587970a","name":"limit.size","userType":"guest","value":100000}]
```

* Check guest's used space
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/resources/_total
{"_id":"562b90fd612ebc04469b1201","userId":"e2a39a50-6898-469c-a596-80f200ee3fe6","assetType":"_total","count":1,"totalSize":9375}
```


## Warnings and errors examples

### Access / Authorization / Tokens

* 21 - Acess denied
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/users
{"code":"21","message":"Acess denied","developerMessage":"Acess to this resource is denied. You can contact administrator in case of mistake.","url":"https://doc.site.url/errors/21","status":"403"}
```

* 91 - Unauthorized
```
curl http://localhost:3000/users
{"code":"91","message":"Unauthorized","developerMessage":"No token provided. Please POST login and password to /login to get token","url":"https://doc.site.url/errors/91","status":"401"}
```

* 92 - Bad token
```
curl -H "x-access-token: eyJhbG" http://localhost:3000/users
{"code":"92","message":"Bad token","developerMessage":"Provided token not accesable. Please, POST login and password to /login to get actual token","url":"https://doc.site.url/errors/92","status":"401"}
```

* 93 - Token to old
```
curl -H "Content-Type: application/json" -d '{"login":"superuser","password":"123","type":"root","email":"guest@host2.url","name":{"first":"ADMIN","last":""}}' http://localhost:3000/register
{"login":"superuser","password":"202cb962ac59075b964b07152d234b70","type":"guest","email":"guest@host2.url","name":{"first":"ADMIN","last":""},"_id":"353e6dbf-9a03-4a07-813d-b6fee5b9411b","_usefulLink":"/users/353e6dbf-9a03-4a07-813d-b6fee5b9411b","_usefulAssets":"/users/353e6dbf-9a03-4a07-813d-b6fee5b9411b/assets","_usefulResources":"/users/353e6dbf-9a03-4a07-813d-b6fee5b9411b/resources"}
curl -H "Content-Type: application/json" -d '{"login":"superuser","password":"123"}' http://localhost:3000/login
{"token":"eyJhbGciOiJIUzI1NiJ9.MzUzZTZkYmYtOWEwMy00YTA3LTgxM2QtYjZmZWU1Yjk0MTFi.BqF8Rvd16_CPGxOXPrpV_DOaIWBCQOhkcBRaJk7DoQc"}
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MzUzZTZkYmYtOWEwMy00YTA3LTgxM2QtYjZmZWU1Yjk0MTFi.BqF8Rvd16_CPGxOXPrpV_DOaIWBCQOhkcBRaJk7DoQc" http://localhost:3000/options
[{"_id":"562b783ee63db5e165879708","name":"limit.files","userType":"guest","value":3},{"_id":"562b783ee63db5e16587970a","name":"limit.size","userType":"guest","value":100000}]

curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI" http://localhost:3000/users/353e6dbf-9a03-4a07-813d-b6fee5b9411b -X DELETE
{"ok":1,"_id":"353e6dbf-9a03-4a07-813d-b6fee5b9411b"}

curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.MzUzZTZkYmYtOWEwMy00YTA3LTgxM2QtYjZmZWU1Yjk0MTFi.BqF8Rvd16_CPGxOXPrpV_DOaIWBCQOhkcBRaJk7DoQc" http://localhost:3000/options
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
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" -F "file=@/tmp/temp/gv_0402_newspicofday_0011.jpg" http://localhost:3000/assets
{"code":"212","message":"Total size limit reached","developerMessage":"There is no space to store user's file. You can delete some files to free some space or upgrade your account to incrase your storage limits","url":"https://doc.site.url/errors/212","status":"409"}
```

* 213 - Total count files limit
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" -F "file=@/tmp/temp/images3.jpeg" http://localhost:3000/assets
{"code":"213","message":"Total count files limit reached","developerMessage":"Count of all files is equal to count files limit. You can delete one file to store this file or upgrade your account to incrase your storage limits","url":"https://doc.site.url/errors/213","status":"409"}
```











Routers
-----------
GET /users
список пользователей
GET /users/{id}
информация о пользователе
POST /users
добавить пользователя
PUT /users/{id}
изменить пользователя
DELETE /users/{id}
удалить пользователя

_id, masterRegion, name.first, name.last, email, metadata


GET /users/{id}/assets
список папок/файлов, лежащих в корне
GET /users/{id}/assets/{id}
список папок/файлов, лежащих в папке {id}
POST /users/{id}/asserts
добавить папку/файл в корневой узел
POST /users/{id}/asserts/{id}
добавить папку/файл в папку {id}
PUT /users/{id}/assets/{id}
изменить документ {id}
DELETE /users/{id}/assets/{id}
удалить документ {id}

_id, masterRegion, userId, path, name, type, size, permissions


GET /users/{id}/assets/resources
получить информацию об использовании всех ресурсов
// GET /users/{id}/assets/resources/{type}
// получить информацию об использовании ресурсов типа type
// GET /users/{id}/assets/{id}/resources
// получить информацию об использовании всех ресурсов, лежащих в папке {id}

_id, masterRegion, userId, assetType, count, totalSize


POST /users/{id}/asserts/search/{name}
поиск папок/файлов по имени, размеру
POST /users/{id}/asserts/{id}/search/{name}
поиск папок/файлов по имени, размеру в папке {id}




MongoDB schemas
-------------


Users manager

What Is This?
-------------
Simple web server using NodeJS express and MongoDB to manage of users


Install
-------------
1. Unpack all files from archive and cd to folder
    tar zxf web_server_express.tar.gz
    cd web_server_express

2. Run npm to install all necessary dependencies
    npm install

3. Edit config file to change parameters
    vi config/default.json

Usage
-------------
To launch web server please use command below
DB_AUTH=dblogin:dbpassw AWS_SECRET=aws.secret node web_server_express.js

Get list of all users
    curl 127.0.0.1:3000/users

Add new user
    curl -d "first_name=Max&last_name=Abramsky&email=aa@aa.ua" 127.0.0.1:3000/users

Get user by id
    curl 127.0.0.1:3000/users/4c5adf87-c7be-47ec-a946-be23d5527e49

Update user by id ( patch )
    curl -d "first_name=Maxim&email=max@abramsky.com" 127.0.0.1:3000/users/4c5adf87-c7be-47ec-a946-be23d5527e49

Remove user
    curl -X "DELETE" 127.0.0.1:3000/users/3931b794-1aef-4520-bd39-236017599a4a


Errors
-------------
There is a count of errors that can be encountered. All these errors are in config file.
    101 - First name not found
    102 - Last name not found
    103 - Email field not found
    111 - first_name don't match (contains special chars)
    112 - last_name don't match (contains special chars)
    113 - email field don't match
    122 - No users found. Please, use POST to add new user
    121 - User not found
    201 - Insert was fail
    201 - Update was fail


List of NodeJS dependencies
-------------
    express 
    mongodb 
    node-uuid 
    config 
    body-parser 


Output example
-------------
$ node -v
    v0.10.40

curl 127.0.0.1:3000/users
    No users found. Please, use POST to add new user

curl -d "first_name=Max&last_name=Abramsky&email=aa@aa.ua" 127.0.0.1:3000/users

curl 127.0.0.1:3000/users/4c5adf87-c7be-47ec-a946-be23d5527e49

curl -d "first_name=Linda&last_name=Star&email=linda@star.com" 127.0.0.1:3000/users

curl 127.0.0.1:3000/users

curl -d "first_name=Maxim&email=max@abramsky.com" 127.0.0.1:3000/users/4c5adf87-c7be-47ec-a946-be23d5527e49
    Recors 4c5adf87-c7be-47ec-a946-be23d5527e49 was updated

curl 127.0.0.1:3000/users

curl -X "DELETE" 127.0.0.1:3000/users/3931b794-1aef-4520-bd39-236017599a4a

curl 127.0.0.1:3000/users


Errors Examples
-------------
curl -d "first_name=Maxim&email=max@abramsky.com" 127.0.0.1:3000/users
    Error 400: Post syntax incorrect. #102: Last name not found 

curl -d "last_name=df*a&first_name=Maxim&email=max@abramsky.com" 127.0.0.1:3000/users
    Error 400: Post syntax incorrect. #112: last_name don't match (contains special chars) 

curl -d "last_name=Saltikov-Shedrin&first_name=Max\`D\`Art&email=max-abramsky.com" 127.0.0.1:3000/users
    Error 400: Post syntax incorrect. #113: email field don't match 

curl -d "last_name=Saltikov-Shedrin&first_name=Max\`D\`Art&email=max@abramsky.com" 127.0.0.1:3000/users
    Recors was inserted. New record id: 4804aa7b-c7c4-47d3-beb0-d08220ac175b 

curl 127.0.0.1:3000/users/4804aa7b-c7c4-47d3-beb0
    Error 404: Not found. #121: User not found 

curl -d "last_name=d)" 127.0.0.1:3000/users/4804aa7b-c7c4-47d3-beb0
    Error 400: Post syntax incorrect. #112: last_name don't match (contains special chars) 
 
curl -d "last_name=dd" 127.0.0.1:3000/users/4804aa7b-c7c4-47d3-beb0
    Error 404: Not found. #121: User not found 


Config file example
-------------
Configuration file is config/default.json. It contains information about database, servers' port 
and list of errors.
Example of config file: 

```javascript
{
////// Database config //////
  "DB" : {
    "url" : "mongodb://gl:gl@ds051933.mongolab.com:51933/gl"
  },
///// Server config /////
  "SERVER" : {
    "port" : 3000
  },
///// Errors code /////
  "ERRORS" : {
    "101" : "First name not found",
    "102" : "Last name not found",
    "103" : "Email field not found",
    "111" : "first_name don't match (contains special chars)",
    "112" : "last_name don't match (contains special chars)",
    "113" : "email field don't match",
    "121" : "User not found",
    "122" : "No users found. Please, use POST to add new user",
    "201" : "Insert was fail",
    "202" : "Update was fail"
  }
}
```


File list
-------------
server.js         server script to launch
config/default.json     config file
controllers/db.js       database controller
controllers/index.js    index page controller
controllers/routes.js   routers
controllers/users.js    users controller
models/users.js   users model
package.json      package information
readme.txt        this readme


Created by
-------------
Dimitry, 2@ivanoff.org.ua .$ curl -A cv ivanoff.org.ua









Основные возможности:
Аутентификация на основе токена
Без токена доступ есть только на следующие ресурсы: '/', '/login', '/register'
Ограничение доступа групп ( админ может все, пользователь и гость только работать с файлами )
Ограничение ресурсов групп, настраивается в БД ( у админа нет ограничений по количеству/объему, у пользователя 100 файлов/10Мб, гость - только 3 файла 100Кб )
Возможность добавлять/удалять/редактировать и получать список пользователей ( только группе admin )
Сразу же после удаления пользователя, он не сможет воспользоваться своим токеном.
Возможность получить всю информацию о владельце токена
Проверка таблицы ограничений для всех групп ( только группе admin )
Добавлять папку в корень/существующую папку
Загружать файл в корень/существующую папку. Файл с именем "Id файла" физически загружается на Amazon S3 в папку "Id пользователя".
Уникальность каждого ресурса соблюдается на уровне: пользователь-путь-имя.
Получать список файлов/папок в корне или в любой папке.
Все файлы и папки, загруженные одним пользователем не могут быть прочитанны другим пользователем.
Получать информацию о файле.
Возможность скачивать файл.
Возможность скачивать папку в формате zip со вложенными документами.
Возможность переносить файл или папку в другую папку.
Искать рекурсивно файлы по имени в определенной папке либо глобально.
Возможность удалять файл. Файл так же удаляется с S3.
Возможность удалять папку. Папка удаляется рекурсивно со всеми вложенными файлами/папками. Так же удаляются соответствующие файлы на S3.
Просматривать ресурсы, занятые пользователем/гостем (количество файлов/общий объем).
Есть возможность просматривать ресурсы только определенного типа файлов.
В конфигурационном файле указываются дополнительные параметры по установке токена, настройки доступа AWS и к базе данных, порт сервера, путь к логам, а так же список ошибок, возникающих при работе системы.
Дополнительные параметры, такие как логин/пароль к базе данных (DB_AUTH) и секрет ключа AWS (AWS_SECRET) должен указываться в глобальных системных переменных или при запуске, например: AWS_SECRET=nnvF453223CRv DB_AUTH=gl:glpass ./start_server
Лог всего происходящего выводится в консоль и пишется в лог-файлы.
Для хранения данных используется mongodb. См. папку ./install для инструкций в случае нового сервера mongo

Тестов мало, нагрузочных тестов мало, описания мало.
