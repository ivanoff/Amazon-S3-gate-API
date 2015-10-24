

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


## Command line examples

### Admin user examples

* Get token of admin user ( type: admin, login/password: admin/admin )
```
curl -H "Content-Type: application/json" -d '{"login":"admin","password":"admin"}' http://localhost:3000/login
{"token":"eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GRHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI"}
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
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.NTIzNTEyNWYtZjQ1Zi00MzA2LWI2MjUtOGJkNGJiZmI1NWVj.mN6i5OJuZfjiDcc5OMIIGitqR7iyldPMyZDt8BzdKHI" http://localhost:3000/assets/60d7ab5b-d6ed-4c7e-905e-ac216bae85b1?download
<binary_data>
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
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/assets/048ff404-e56e-483d-b4c0-4ee67d6cf924?download
<binary_data>
```

* Check if it can be downloaded by other user
```
curl -H "x-access-token: eyJhbGciOiJIUzI1NiJ9.ZTJhMzlhNTAtNjg5OC00NjljLWE1OTYtODBmMjAwZWUzZmU2.GsZzkpcTlNdS3sCeaiiGvtEcfS4nPIy77QmZVXWxO64" http://localhost:3000/assets/048ff404-e56e-483d-b4c0-4ee67d6cf924?download
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

### Uploads overlimits

*


MongoDB schemas
-------------
users
_id, masterRegion, name.first, name.last, email, metadata
mongos> use ivanoffdb
mongos> sh.enableSharding("ivanoffdb")
mongos> db.users2.createIndex( { "masterRegion": 1, "_id": 1 } )
mongos> sh.shardCollection( "ivanoffdb.users2", { "masterRegion": 1, "_id": 1 } )
mongos> sh.addTagRange( "ivanoffdb.users2", { masterRegion: "us-east-1", _id : MinKey }, { masterRegion: "us-east-1", _id : MaxKey }, "us-east-1" )
mongos> sh.addTagRange( "ivanoffdb.users2", { masterRegion: "eu-west-1", _id : MinKey }, { masterRegion: "eu-west-1", _id : MaxKey }, "eu-west-1" )
mongos> db.userFiles.createIndex( { email: 1 }, { unique: true } )

assets
_id, masterRegion, userId, path, name, type, size, permissions
mongos> db.users2.createIndex( { "masterRegion": 1, "_id": 1 } )
mongos> db.userFiles.createIndex( { email: 1 }, { unique: true } )


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

