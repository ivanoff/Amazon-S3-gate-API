# S3 API  version v1

{toc:printable=true|style=square|minLevel=2|maxLevel=2|type=list|outline=false|include=.*}

\\
----

*Base Uri:* http://localhost






## /login

Description: Get token by user&#x27;s login and password





### /login
####  POST 







##### Body


###### application/json


  
{
  "type": "object",
  "$schema": "http://json-schema.org/draft-03/schema",
  "id": "http://jsonschema.net",
  "required": true,
  "properties": {
    "login": {
      "type": "string",
      "required": true
    },
    "password": {
      "type": "string",
      "required": true
    }
  }
}

```


  
{
  "login":"user21",
  "password":"userSeCr3f"
}

```





##### Responses

     h6. 200 


                   Type: application/json




              	
{
  "token":"eyJhbGciOiJIUzI1NiJ9.MmEwNzIyZmQtODhiNC00MzBmLTkyOGYtOTRmNTEyNjc2ZTRi.SbA9GrHGxuQY_mIsqlP7t4ZTll_Zq_4-4l088tP0qxI"
  "_links": 
  {
    "self":
    {
      "href":"/me"
    },
    "assets":
    {
      "href":"/assets"
    },
    "resources":
    {
      "href":"/resources"
    }
  }
}

```
              
                 
     h6. 401 


                   Type: application/json




              	
{
  "code":"91",
  "message":"Unauthorized",
  "developerMessage":"No token provided. Please POST login and password to /login to get token",
  "url":"https://doc.site.url/errors/91",
  "status":"401"
}

```
              
                 
     h6. 404 


                   Type: application/json




              	
{
  "code":"121",
  "message":"User not found",
  "developerMessage":"Provided information not enough to find user",
  "url":"https://doc.site.url/errors/121",
  "status":"404"
}

```
              
                 
                                    










\\
----
## /register






### /register
####  POST  : Register new guest user







##### Body


###### application/json


  
{
  "type": "object",
  "$schema": "http://json-schema.org/draft-03/schema",
  "id": "http://jsonschema.net",
  "required": true,
  "properties": {
    "login": {
      "type": "string",
      "required": true
    },
    "password": {
      "type": "md5",
      "required": true
    },
    "type": {
      "type": "string"
    },
    "name": {
      "type": "object",
      "required": true,
      "properties": {
        "first": {
          "type": "string",
          "maxLength": 128,
          "required": true
        },
        "last": {
          "type": "string",
          "maxLength": 128
        }
      }
    },
    "email": {
      "type": "email"
    },
    "metadata": {
      "type": "object"
    }
  }
}

```


  
{
  "login":"user21",
  "password":"userSeCr3f",
  "type":"user",
  "email":"user@host.url",
  "name":
  {
    "first":"Alexander",
    "last":"Muchilton"
  }
}

```





##### Responses

     h6. 201 


                   Type: application/json




              	
{
  "login":"guest5",
  "password":"1ba562cc025376a90f12a9ec337cf67a",
  "email":"guest5@mail.ru",
  "name":
  {
    "first":"Ivan",
    "last":"Ivanov"
  },
  "type":"guest",
  "_id":"eeec7b34-1157-4167-919f-ed9370bdc27c",
  "_links":
  {
    "self":
    { 
      "href":"/users/eeec7b34-1157-4167-919f-ed9370bdc27c"
    }
  }
}

```
              
                 
     h6. 400 


                   Type: application/json




              	
[
  {
    ",name":"Field 'first' not matched with type 'string'"
  },
  {
    ",name":"Field 'email' not matched with type 'email'"
  },
  {
    "":"Field 'password' is requied, but not found"
  },
  {
    "":"Field 'login' is requied, but not found"
  },
  {
    "":"Field 'name.first' is requied, but not found"
  }
]

```
              
                 
     h6. 500 


                   Type: application/json




              	
{
  "code":"3",
  "message":"Server error",
  "url":"https://doc.site.url/errors/3",
  "status":"500",
  "developerMessage":
  {
    "code":11000,
    "index":0,
    "errmsg":"E11000 duplicate key error index: gl.users.$login_1 dup key: { : \"guest5\" }",
    "op":
    {
      "login":"guest5",
      "password":"1ba562cc025376a90f12a9ec337cf67a",
      "email":"guest5@mail.ru",
      "name":
      {
        "first":"Ivan",
        "last":"Ivanov"
      },
      "type":"guest",
      "_id":"ee26af1e-b907-4e37-8b99-a8ec1302c4b6"
    }
  }
}

```
              
                 
                                    










\\
----
## /me






### /me
####  GET  : Get information about user - owner of the provided token



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |






##### Responses

     h6. 200 


                   Type: application/json




              	
{
  "options":
  [
    {
      "_id":"562b783ee63db5e165879708",
      "name":"limit.files",
      "userType":"guest",
      "value":3
    },
    {
      "_id":"562b783ee63db5e16587970a",
      "name":"limit.size",
      "userType":"guest",
      "value":100000
    }
  ],
  "user":
  {
    "_id":"eeec7b34-1157-4167-919f-ed9370bdc27c",
    "login":"guest5",
    "password":"1ba562cc025376a90f12a9ec337cf67a",
    "email":"guest5@mail.ru",
    "name":
    {
      "first":"Ivan",
      "last":"Ivanov"
    },
    "type":"guest"
  },
  "resources":
  {
    "_id":"5631cf04388e48e208eb8818",
    "userId":"eeec7b34-1157-4167-919f-ed9370bdc27c",
    "assetType":"_total",
    "count":0,
    "totalSize":0
  },
  "_links":
  {
    "self":
    {
      "href":"/me"
    },
    "assets":
    {
      "href":"/assets"
    },
    "resources":
    {
      "href":"/resources"
    }
  }
}

```
              
                 
                                    










\\
----
## /options






### /options
####  GET  : Get options of the user&#x27;s group - owner of provided token



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |






##### Responses

     h6. 200 


                   Type: application/json




              	
[
  {
    "_id":"562b783ee63db5e165879708",
    "name":"limit.files",
    "userType":"guest",
    "value":3
  },
  {
    "_id":"562b783ee63db5e16587970a",
    "name":"limit.size",
    "userType":"guest",
    "value":100000
  }
]

```
              
                 
                                    










\\
----
## /assets

Description: Work with assets ( files and folders )





### /assets
####  GET  : Get list of assets in root directory



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |






##### Responses

     h6. 200 


                   Type: application/json




              	
[
  {
    "_id":"1588cd60-bbf5-46aa-90ea-db56aeffdb06",
    "name":"new",
    "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "type":"folder",
    "path":"",
    "size":0
  },
  {
    "_id":"7cd02b1d-e76c-4343-802c-bccb94ff6473",
    "name":"test",
    "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "type":"folder",
    "path":"",
    "size":0
  },
  {
    "_id":"bf238476-eec6-4e3b-97f8-d22d72d998f8",
    "name":"test2",
    "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "type":"folder",
    "path":"",
    "size":0
  },
  {
    "_id":"f06dc4b7-ab0a-4388-9c96-2e1bc17138ed",
    "name":"test3",
    "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "type":"folder",
    "path":"",
    "size":0
  }
]

```
              
                 
                                    







####  POST  : add asset to root folder



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |





##### Body


###### application/json

###### Form Parameters

| Param Name | Type | Required | Example | Default | Description |
| name | string | (/) | video |  | New folder name |





###### multipart/form-data

###### Form Parameters

| Param Name | Type | Required | Example | Default | Description |
| file | file | (/) |  |  | The file to be uploaded |






##### Responses

     h6. 201 


                   Type: application/json




              	
{
  "_id":"413809a0-276f-4f0a-95ca-04d3f6dbdf1d",
  "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
  "type":"image",
  "name":"index.jpeg",
  "size":13128,
  "path":"",
  "_links":
  {
    "self":
    {
      "href":"/assets/413809a0-276f-4f0a-95ca-04d3f6dbdf1d"
    },
    "resources":
    {
      "href":"/resources"
    }
  }
}

```
              
                 
                                    










### /assets/search



### /assets/search/\{name\}
####  GET  : Search file and folder in whole storage by {name} name



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |






##### Responses

     h6. 200 


                   Type: application/json




              	
[
  {
    "_id":"df570ef4-fdb8-4d01-b185-52957feb5a67",
    "name":"newfolder",
    "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "type":"folder",
    "path":"",
    "size":0
  },
  {
    "_id":"36e6cc2f-3a48-41b8-a741-f6e13dc68e75",
    "name":"newfolder2",
    "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "type":"folder",
    "path":"",
    "size":0
  }
]

```
              
                 
                                    










### /assets/\{assetId\}
####  GET  : Get list of file and folder in {assetId} folder



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |






##### Responses

     h6. 200 


                   Type: application/json




              	
[
  {
    "_id":"016c5bf9-0916-4106-9e56-56a656177a50",
    "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "type":"image",
    "name":"images.jpeg",
    "size":9375,
    "path":"/test3/test4",
    "parentId":"715490af-2e04-4595-b58e-b4a399daf49c"
  },
  {
    "_id":"a45f1e72-a543-461f-86a0-2e0e53a56406",
    "name":"test5",
    "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "type":"folder",
    "path":"/test3/test4",
    "parentId":"715490af-2e04-4595-b58e-b4a399daf49c",
    "size":0
  }
]

```
              
                 
                                    







####  POST  : Add folder or upload file to {assetId} folder



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |





##### Body


###### application/json

###### Form Parameters

| Param Name | Type | Required | Example | Default | Description |
| name | string | (/) | video2 |  | New folder name |





###### multipart/form-data

###### Form Parameters

| Param Name | Type | Required | Example | Default | Description |
| file | file | (/) |  |  | New file content |






##### Responses

     h6. 201 


                   Type: application/json




              	
{
  "_id":"413809a0-276f-4f0a-95ca-04d3f6dbdf1d",
  "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
  "type":"image",
  "name":"index.jpeg",
  "size":13128,
  "path":"",
  "_links":
  {
    "self":
    {
      "href":"/assets/413809a0-276f-4f0a-95ca-04d3f6dbdf1d"
    },
    "resources":
    {
      "href":"/resources"
    }
  }
}

```
              
                 
     h6. 400 


                   Type: application/json




              	
{
  "code":"133",
  "message":"Asset is not folder",
  "developerMessage":"Asset is not a folder type, so it cannot store additional files",
  "url":"https://doc.site.url/errors/133",
  "status":"400"
}

```
              
                 
     h6. 409 


                   Type: application/json




              	
{
  "code":"134",
  "message":"Asset exists",
  "developerMessage":"Asset with provided name already exists in provided folder",
  "url":"https://doc.site.url/errors/134",
  "status":"409"
}

```
              
                 
                                    







####  PUT  : Change whole information about file/folder in {assetId} folder



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |



##### Query Parameters

| Param Name | Type | Required | Example | Default | Description |
| name | string | (x) | video2 |  | New folder name |




##### Responses

     h6. 201 


                   Type: application/json




              	
{
  "_id":"715490af-2e04-4595-b58e-b4a399daf49c",
  "name":"newfolder4",
  "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
  "type":"folder",
  "path":"/test3",
  "parentId":"f06dc4b7-ab0a-4388-9c96-2e1bc17138ed",
  "size":0,
  "_links":
  {
    "self":
    {
      "href":"/assets/715490af-2e04-4595-b58e-b4a399daf49c"
    },
    "resources":
    {
      "href":"/resources"
    }
  }
}

```
              
                 
     h6. 409 


                   Type: application/json




              	
{
  "code":"134",
  "message":"Asset exists",
  "developerMessage":"Asset with provided name already exists in provided folder",
  "url":"https://doc.site.url/errors/134",
  "status":"409"
}

```
              
                 
                                    







####  PATCH  : Move {assetId} file/folder into {moveTo} folder



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |



##### Query Parameters

| Param Name | Type | Required | Example | Default | Description |
| moveTo | string | (/) | f06dc4b7-ab0a-4388-9c96-2e1bc17138ed |  | Move-to folder Id |




##### Responses

     h6. 201 


                   Type: application/json




              	
{
  "_id":"413809a0-276f-4f0a-95ca-04d3f6dbdf1d",
  "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
  "type":"image",
  "name":"index.jpeg",
  "size":13128,
  "path":"/test3",
  "parentId":"f06dc4b7-ab0a-4388-9c96-2e1bc17138ed"
}

```
              
                 
     h6. 400 


                   Type: application/json




              	
{
  "code":"133",
  "message":"Asset is not folder",
  "developerMessage":"Asset is not a folder type, so it cannot store additional files",
  "url":"https://doc.site.url/errors/133",
  "status":"400"
}

```
              
                 
     h6. 404 


                   Type: application/json




              	
{
  "code":"131",
  "message":"Asset not found",
  "developerMessage":"No asset with this parameters owned by this user was found",
  "url":"https://doc.site.url/errors/131",
  "status":"404"
}

```
              
                 
     h6. 409 


                   Type: application/json




              	
{
  "code":"134",
  "message":"Asset exists",
  "developerMessage":"Asset with provided name already exists in provided folder",
  "url":"https://doc.site.url/errors/134",
  "status":"409"
}

```
              
                 
                                    







####  DELETE  : Delete {assetId} file or folder recursively



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |



##### Query Parameters

| Param Name | Type | Required | Example | Default | Description |
| moveTo | string | (/) | f06dc4b7-ab0a-4388-9c96-2e1bc17138ed |  | Asset Id to delete |




##### Responses

     h6. 200 


                   Type: application/json




              	
{
  "ok":1,
  "_id":"f06dc4b7-ab0a-4388-9c96-2e1bc17138ed"
}

```
              
                 
                                    










### /assets/\{assetId\}/content
####  GET  : Download file or folder



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |






##### Responses

     h6. 200 


                   Type: application/octet-stream




     h6. 404 


                   Type: application/json




              	
{
  "code":"131",
  "message":"Asset not found",
  "developerMessage":"No asset with this parameters owned by this user was found",
  "url":"https://doc.site.url/errors/131",
  "status":"404"
}

```
              
                 
                                    










### /assets/\{assetId\}/search



### /assets/\{assetId\}/search/\{name\}
####  GET  : Search file and folder in {assetId} folder by name {name}



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |






##### Responses

     h6. 200 


                   Type: application/json




              	
[
  {
    "_id":"60170500-70e4-494d-9447-5b6b1cfa599c",
    "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "type":"image",
    "name":"index.jpeg",
    "size":13128,
    "path":"/test2",
    "parentId":"bf238476-eec6-4e3b-97f8-d22d72d998f8"
  }
]

```
              
                 
                                    










\\
----
## /resources






### /resources
####  GET  : Get information about used resources



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |






##### Responses

     h6. 200 


                   Type: application/json




              	
[
  {
    "_id":"562b90fd612ebc04469b1201",
    "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "assetType":"_total",
    "count":12,
    "totalSize":63756
  },
  {
    "_id":"562e056147044236446babbd",
    "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "assetType":"folder",
    "count":6,
    "totalSize":0
  },
  {
    "_id":"562b9306612ebc04469b1202",
    "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "assetType":"image",
    "count":6,
    "totalSize":63756
  }
]

```
              
                 
                                    










### /resources/\{type\}
####  GET  : Get information about used resources by type {type}



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | User's token |






##### Responses

     h6. 200 


                   Type: application/json




              	
{
  "_id":"562b9306612ebc04469b1202",
  "userId":"e2a39a50-6898-469c-a596-80f200ee3fe6",
  "assetType":"image",
  "count":6,
  "totalSize":63756
}

```
              
                 
     h6. 404 


                   Type: application/json




              	
{
  "code":"132",
  "message":"No assets found",
  "developerMessage":"No assets owned by this user in the database. Please, use POST to add new one",
  "url":"https://doc.site.url/errors/132",
  "status":"404"
}

```
              
                 
                                    










\\
----
## /users






### /users
####  GET  : Get list of all users



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | Admin's token |






##### Responses

     h6. 200 


                   Type: application/json




              	
[
  {
    "_id":"2a0722fd-88b4-430f-928f-94f512676e4b",
    "login":"admin",
    "password":"21232f297a57a5a743894a0e4a801fc3",
    "type":"admin",
    "email":"admin@localhost",
    "name":
    {
      "first":"Admin",
      "last":""
    }
  },
  {
    "_id":"5235125f-f45f-4306-b625-8bd4bbfb55ec",
    "login":"user",
    "password":"ee11cbb19052e40b07aac0ca060c23ee",
    "type":"user",
    "email":"user@host.url",
    "name":
    {
      "first":"User",
      "last":""
    }
  },
  {
    "_id":"e2a39a50-6898-469c-a596-80f200ee3fe6",
    "login":"anatoly"
    ,"password":"674f33841e2309ffdd24c85dc3b999de",
    "type":"guest",
    "email":"anatol@host.url",
    "name":
    {
      "first":"Anatoly",
      "last":"Jovanny"
    }
  }
]

```
              
                 
     h6. 403 


                   Type: application/json




              	
{
  "code":"21",
  "message":"Acess denied",
  "developerMessage":"Acess to this resource is denied. You can contact administrator in case of mistake.",
  "url":"https://doc.site.url/errors/21",
  "status":"403"
}

```
              
                 
     h6. 404 


                   Type: application/json




              	
{ 
  "code" : "122", 
  "message" : "No users found",
  "developerMessage" : "No users in the database at all",
  "url" : "https://doc.site.url/errors/122", 
  "status" : "404" 
}

```
              
                 
                                    







####  POST  : Add user



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | Admin's token |



##### Query Parameters

| Param Name | Type | Required | Example | Default | Description |
| login | string | (/) | admin |  | User's login |
| password | string | (/) | bassMolp |  | User's password |
| type | string | (x) | admin |  | User's type ( admin, user, guest ) |
| email | string | (x) | user@host.url |  | User's e-mail |
| name.first | string | (/) | Ivan |  | User's first name |
| name.last | string | (x) | Ivanov |  | User's last name |




##### Responses

     h6. 201 


                   Type: application/json




              	
{
  "login":"nikolay",
  "password":"137f62cc025376a90f12a9ec337cf67a",
  "email":"nikolay@mail.ru",
  "name":
  {
    "first":"Nikolay",
    "last":"Nikolayev"
  },
  "type":"user",
  "_id":"1fec7b34-1157-4167-919f-ed9370bdc27c",
  "_links":
  {
    "self":
    { 
      "href":"/users/1fec7b34-1157-4167-919f-ed9370bdc27c"
    }
  }
}

```
              
                 
     h6. 400 


                   Type: application/json




              	
[
  {
    ",name":"Field 'first' not matched with type 'string'"
  },
  {
    ",name":"Field 'email' not matched with type 'email'"
  },
  {
    "":"Field 'password' is requied, but not found"
  },
  {
    "":"Field 'login' is requied, but not found"
  },
  {
    "":"Field 'name.first' is requied, but not found"
  }
]

```
              
                 
     h6. 403 


                   Type: application/json




              	
{
  "code":"21",
  "message":"Acess denied",
  "developerMessage":"Acess to this resource is denied. You can contact administrator in case of mistake.",
  "url":"https://doc.site.url/errors/21",
  "status":"403"
}

```
              
                 
     h6. 500 


                   Type: application/json




              	
{
  "code":"3",
  "message":"Server error",
  "url":"https://doc.site.url/errors/3",
  "status":"500",
  "developerMessage":
  {
    "code":11000,
    "index":0,
    "errmsg":"E11000 duplicate key error index: gl.users.$login_1 dup key: { : \"user\" }",
    "op":
    {
      "login":"user",
      "password":"1ba562cc025376a90f12a9ec337cf67a",
      "email":"user@mail.ru",
      "name":
      {
        "first":"Ivan",
        "last":"Ivanov"
      },
      "type":"user",
      "_id":"4f26af1e-b907-4e37-8b99-a8ec1302c4b6"
    }
  }
}

```
              
                 
                                    










### /users/\{userId\}
####  GET  : Show information about {userId} user



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | Admin's token |






##### Responses

     h6. 200 


                   Type: application/json




              	
{
  "_id":"eeec7b34-1157-4167-919f-ed9370bdc27c",
  "login":"guest5",
  "password":"1ba562cc025376a90f12a9ec337cf67a",
  "email":"guest5@mail.ru",
  "name":
  {
    "first":"Ivan",
    "last":"Ivanov"
  },
  "type":"guest"
}

```
              
                 
     h6. 404 


                   Type: application/json




              	
{
  "code":"121",
  "message":"User not found",
  "developerMessage":"Provided information not enough to find user",
  "url":"https://doc.site.url/errors/121",
  "status":"404"
}

```
              
                 
                                    







####  PUT  : Change all information about {userId} user



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | Admin's token |



##### Query Parameters

| Param Name | Type | Required | Example | Default | Description |
| login | string | (/) | admin |  | User's login |
| password | string | (/) | bassMolp |  | User's password |
| type | string | (x) | admin |  | User's type ( admin, user, guest ) |
| email | string | (x) | user@host.url |  | User's e-mail |
| name.first | string | (/) | Ivan |  | User's first name |
| name.last | string | (x) | Ivanov |  | User's last name |




##### Responses

     h6. 201 


                   Type: application/json




              	
{
  "_id":"eeec7b34-1157-4167-919f-ed9370bdc27c",
  "login":"guest5",
  "password":"1ba562cc025376a90f12a9ec337cf67a",
  "email":"zzz@mail.ru",
  "name":
  {
    "first":"Ivan",
    "last":"Ivanov"
  },
  "type":"guest"
}

```
              
                 
     h6. 400 


                   Type: application/json




              	
[
  {
    ",name":"Field 'first' not matched with type 'string'"
  },
  {
    ",name":"Field 'email' not matched with type 'email'"
  },
  {
    "":"Field 'password' is requied, but not found"
  },
  {
    "":"Field 'login' is requied, but not found"
  },
  {
    "":"Field 'name.first' is requied, but not found"
  }
]

```
              
                 
     h6. 403 


                   Type: application/json




              	
{
  "code":"21",
  "message":"Acess denied",
  "developerMessage":"Acess to this resource is denied. You can contact administrator in case of mistake.",
  "url":"https://doc.site.url/errors/21",
  "status":"403"
}

```
              
                 
     h6. 404 


                   Type: application/json




              	
{
  "code":"121",
  "message":"User not found",
  "developerMessage":"Provided information not enough to find user",
  "url":"https://doc.site.url/errors/121",
  "status":"404"
}

```
              
                 
     h6. 500 


                   Type: application/json




              	
{
  "code":"3",
  "message":"Server error",
  "url":"https://doc.site.url/errors/3",
  "status":"500",
  "developerMessage":
  {
    "code":11000,
    "index":0,
    "errmsg":"E11000 duplicate key error index: gl.users.$login_1 dup key: { : \"user\" }",
    "op":
    {
      "login":"user",
      "password":"1ba562cc025376a90f12a9ec337cf67a",
      "email":"zzz@mail.ru",
      "name":
      {
        "first":"Ivan",
        "last":"Ivanov"
      },
      "type":"guest"
      "_id":"eeec7b34-1157-4167-919f-ed9370bdc27c"
    }
  }
}

```
              
                 
                                    







####  PATCH  : Change part of information about {userId} user



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | Admin's token |



##### Query Parameters

| Param Name | Type | Required | Example | Default | Description |
| login | string | (x) | admin |  | User's login |
| password | string | (x) | bassMolp |  | User's password |
| type | string | (x) | admin |  | User's type ( admin, user, guest ) |
| email | string | (x) | user@host.url |  | User's e-mail |
| name.first | string | (x) | Ivan |  | User's first name |
| name.last | string | (x) | Ivanov |  | User's last name |




##### Responses

     h6. 201 


                   Type: application/json




              	
{
  "_id":"eeec7b34-1157-4167-919f-ed9370bdc27c",
  "login":"zzz",
  "password":"f3abb86bd34cf4d52698f14c0da1dc60",
  "email":"guest5@mail.ru",
  "name":
  {
    "first":"Ivan",
    "last":"Ivanov"
  },
  "type":"guest"
}

```
              
                 
     h6. 400 


                   Type: application/json




              	
[
  {
    ",name":"Field 'first' not matched with type 'string'"
  }
  {
    ",name":"Field 'email' not matched with type 'email'"
  }
  {
    "":"Field 'password' is requied, but not found"
  }
  {
    "":"Field 'login' is requied, but not found"
  }
  {
    "":"Field 'name.first' is requied, but not found"
  }
]

```
              
                 
     h6. 403 


                   Type: application/json




              	
{
  "code":"21",
  "message":"Acess denied",
  "developerMessage":"Acess to this resource is denied. You can contact administrator in case of mistake.",
  "url":"https://doc.site.url/errors/21",
  "status":"403"
}

```
              
                 
     h6. 404 


                   Type: application/json




              	
{
  "code":"121",
  "message":"User not found",
  "developerMessage":"Provided information not enough to find user",
  "url":"https://doc.site.url/errors/121",
  "status":"404"
}

```
              
                 
     h6. 500 


                   Type: application/json




              	
{
  "code":"3",
  "message":"Server error",
  "url":"https://doc.site.url/errors/3",
  "status":"500",
  "developerMessage":
  {
    "code":11000,
    "index":0,
    "errmsg":"E11000 duplicate key error index: gl.users.$login_1 dup key: { : \"user\" }",
    "op":
    {
      "login":"user",
      "password":"1ba562cc025376a90f12a9ec337cf67a",
      "email":"zzz@mail.ru",
      "name":
      {
        "first":"Ivan",
        "last":"Ivanov"
      },
      "type":"guest"
      "_id":"eeec7b34-1157-4167-919f-ed9370bdc27c"
    }
  }
}

```
              
                 
                                    







####  DELETE  : Delete {userId} user



##### Request Headers

| Param Name | Type | Required | Example | Description |
| x-access-token | string | (/) | eyJhbGciOiJIUzI1NiJ9.ZWVlYzdiMzQtMTE1Ny00MTY3LTkxOWYtZWQ5MzcwYmRjMjdj.a_k7hBg2mC3x4YUdTfeS6WuZlh2fMhQIlVSv8djCmw0 | Admin's token |






##### Responses

     h6. 200 


                   Type: application/json




              	
{
  "ok":1,
  "_id":"eeec7b34-1157-4167-919f-ed9370bdc27c"
}

```
              
                 
     h6. 403 


                   Type: application/json




              	
{
  "code":"21",
  "message":"Acess denied",
  "developerMessage":"Acess to this resource is denied. You can contact administrator in case of mistake.",
  "url":"https://doc.site.url/errors/21",
  "status":"403"
}

```
              
                 
     h6. 404 


                   Type: application/json




              	
{
  "code":"121",
  "message":"User not found",
  "developerMessage":"Provided information not enough to find user",
  "url":"https://doc.site.url/errors/121",
  "status":"404"
}

```
              
                 
                                    










\\
----


