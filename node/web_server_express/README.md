

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


## Command line example

* Add user "John Richard the XIII"
```bash
curl -d '{"name":{"first":"John","last":"Richard XIII"},"email":"t@t2t.oo"}' -H "Content-Type: application/json" http://localhost:3000/users
```
```json
{"name":{"first":"John","last":"Richard XIII"},"email":"t@t2t.oo","_id":"d536ef67-4aea-450f-bd1f-209120d28679","_usefulLink":"/users/d536ef67-4aea-450f-bd1f-209120d28679","_usefulAssets":"/users/d536ef67-4aea-450f-bd1f-209120d28679/assets","_usefulResources":"/users/d536ef67-4aea-450f-bd1f-209120d28679/resources"}
```


* Show just added user
```bash
curl http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679
```
```json
{"_id":"d536ef67-4aea-450f-bd1f-209120d28679","name":{"first":"John","last":"Richard XIII"},"email":"t@t2t.oo"}
```


* Show his assets
```bash
curl http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/assets
```
```json
[]
```


* Show user's used resources
```bash
curl http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/resources
```
```json
[{"_id":"5626143efc03aa5758d62f3d","userId":"d536ef67-4aea-450f-bd1f-209120d28679","assetType":"_total","count":0,"totalSize":0}]
```


* Add folder 'video' to root of access
```bash
curl -H "Content-Type: application/json" -d '{"name":"video"}' http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/assets
```
```json
{"name":"video","type":"folder","_id":"fda404c5-330e-4ea7-8817-3b6d59f52432","userId":"d536ef67-4aea-450f-bd1f-209120d28679","path":"","size":0}
```


* Show root folder
```bash
curl http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/assets
```
```json
[{"_id":"fda404c5-330e-4ea7-8817-3b6d59f52432","name":"video","type":"folder","userId":"d536ef67-4aea-450f-bd1f-209120d28679","path":"","size":0}]
```


* Show user's used resources
```bash
curl http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/resources
```
```json
[{"_id":"5626143efc03aa5758d62f3d","userId":"d536ef67-4aea-450f-bd1f-209120d28679","assetType":"_total","count":1,"totalSize":0},{"_id":"56261478fc03aa5758d62f3e","userId":"d536ef67-4aea-450f-bd1f-209120d28679","assetType":"folder","count":1,"totalSize":0}]
```


* Upload one image to root folder
```bash
curl -F "file=@/tmp/temp/index.jpeg" http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/assets
```
```json

```


* Show image parameters
```bash
curl http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/assets/d536ef67-4aea-450f-bd1f-209120d28679
```
```json

```


* Download image to root folder
```bash
curl http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/assets/d536ef67-4aea-450f-bd1f-209120d28679?download
```
```json

```


* Show content of the 'video' folder
```bash
curl http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/assets/fda404c5-330e-4ea7-8817-3b6d59f52432
```
```json
[{"_id":"05e34208-7377-4bee-bbee-a9e395e9b315","name":"hotfuzz2.avi","type":"video","size":1300,"userId":"d536ef67-4aea-450f-bd1f-209120d28679","path":"/video"},{"_id":"31b8770b-a857-44ac-9a13-f62cd1238c79","name":"hotfuzz.avi","type":"video","size":1000,"userId":"d536ef67-4aea-450f-bd1f-209120d28679","path":"/video"},{"_id":"c88b71d8-3ca9-47bb-9bd4-0792ca28dc23","name":"nick.jpg","type":"image","size":10,"userId":"d536ef67-4aea-450f-bd1f-209120d28679","path":"/video"}]
```


* Show user's used resources
```bash
curl http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/resources
```
```json
[{"_id":"5626143efc03aa5758d62f3d","userId":"d536ef67-4aea-450f-bd1f-209120d28679","assetType":"_total","count":4,"totalSize":2310},{"_id":"56261478fc03aa5758d62f3e","userId":"d536ef67-4aea-450f-bd1f-209120d28679","assetType":"folder","count":1,"totalSize":0},{"_id":"562614aafc03aa5758d62f3f","userId":"d536ef67-4aea-450f-bd1f-209120d28679","assetType":"video","count":2,"totalSize":2300},{"_id":"56261500fc03aa5758d62f40","userId":"d536ef67-4aea-450f-bd1f-209120d28679","assetType":"image","count":1,"totalSize":10}]
```


* Delete 'video' folder
```bash
curl http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/assets/fda404c5-330e-4ea7-8817-3b6d59f52432 -X DELETE
```
```json
{"ok":1,"_id":"fda404c5-330e-4ea7-8817-3b6d59f52432"}
```


* Try to list of content of removed folder
```bash
curl http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/assets/fda404c5-330e-4ea7-8817-3b6d59f52432
```
```json
{"error":1,"text":{"131":"Asset not found"}}
```


* Show user's used resources
```bash
curl http://localhost:3000/users/d536ef67-4aea-450f-bd1f-209120d28679/resources
```
```json
[{"_id":"5626143efc03aa5758d62f3d","userId":"d536ef67-4aea-450f-bd1f-209120d28679","assetType":"_total","count":0,"totalSize":0},{"_id":"56261478fc03aa5758d62f3e","userId":"d536ef67-4aea-450f-bd1f-209120d28679","assetType":"folder","count":0,"totalSize":0},{"_id":"562614aafc03aa5758d62f3f","userId":"d536ef67-4aea-450f-bd1f-209120d28679","assetType":"video","count":0,"totalSize":0},{"_id":"56261500fc03aa5758d62f40","userId":"d536ef67-4aea-450f-bd1f-209120d28679","assetType":"image","count":0,"totalSize":0}]
```



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
    node web_server_express.js

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

