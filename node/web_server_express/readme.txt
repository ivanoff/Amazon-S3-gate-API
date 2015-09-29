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


Additional modules
-------------
All additional modules are located in ./modules folder.
Module db.js is necessary for work with MongoDB database
Modules models.js and types.js are necessary for validate incoming data ( planned )


Errors
-------------
There is a count of errors that can be encountered. All these errors are in config file.
    101 - First name not found
    102 - Last name not found
    103 - Email field not found
    111 - first_name don't match (contains special chars)
    112 - last_name don't match (contains special chars)
    113 - email field don't match
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
    No users found. Please, use POST to add new user.

curl -d "first_name=Max&last_name=Abramsky&email=aa@aa.ua" 127.0.0.1:3000/users
    Recors was inserted. New record id: 4c5adf87-c7be-47ec-a946-be23d5527e49

curl 127.0.0.1:3000/users/4c5adf87-c7be-47ec-a946-be23d5527e49
      ID|  Last name|  First name|  Email
    4c5adf87-c7be-47ec-a946-be23d5527e49|  Abramsky|  Max|  aa@aa.ua|  [object Object]

curl -d "first_name=Linda&last_name=Abramsky&email=aa@aa.ua" 127.0.0.1:3000/users
    Recors was inserted. New record id: 3931b794-1aef-4520-bd39-236017599a4a

curl 127.0.0.1:3000/users/3931b794-1aef-4520-bd39-236017599a4a
      ID|  Last name|  First name|  Email
    3931b794-1aef-4520-bd39-236017599a4a|  Abramsky|  Linda|  aa@aa.ua|  [object Object]

curl 127.0.0.1:3000/users
      ID|  Last name|  First name|  Email
    4c5adf87-c7be-47ec-a946-be23d5527e49|  Abramsky|  Max|  aa@aa.ua|  [object Object]
    3931b794-1aef-4520-bd39-236017599a4a|  Abramsky|  Linda|  aa@aa.ua|  [object Object]$ 

curl -d "last_name=Belovich" 127.0.0.1:3000/users/3931b794-1aef-4520-bd39-236017599a4a
    Recors 3931b794-1aef-4520-bd39-236017599a4a was updated

curl 127.0.0.1:3000/users/
      ID|  Last name|  First name|  Email
    4c5adf87-c7be-47ec-a946-be23d5527e49|  Abramsky|  Max|  max@abramsky.com|  
    3931b794-1aef-4520-bd39-236017599a4a|  Belovich|  Linda|  aa@aa.ua|  [object Object]

curl -d "first_name=Maxim&email=max@abramsky.com" 127.0.0.1:3000/users/4c5adf87-c7be-47ec-a946-be23d5527e49
    Recors 4c5adf87-c7be-47ec-a946-be23d5527e49 was updated

curl 127.0.0.1:3000/users
      ID|  Last name|  First name|  Email
    4c5adf87-c7be-47ec-a946-be23d5527e49|  Abramsky|  Maxim|  max@abramsky.com|  
    3931b794-1aef-4520-bd39-236017599a4a|  Belovich|  Linda|  aa@aa.ua|  [object Object]

curl -X "DELETE" 127.0.0.1:3000/users/3931b794-1aef-4520-bd39-236017599a4a
    User 3931b794-1aef-4520-bd39-236017599a4a removed

curl 127.0.0.1:3000/users
      ID|  Last name|  First name|  Email
    4c5adf87-c7be-47ec-a946-be23d5527e49|  Abramsky|  Maxim|  max@abramsky.com|  


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

{
  // Database config
  "DB" : {
    "url" : "mongodb://gl:gl@ds051933.mongolab.com:51933/gl",
    "collection" : "users"
  },
  // Server config
  "SERVER" : {
    "port" : 3000
  },
  // Errors code
  "ERROR" : {
    "101" : "First name not found",
    "102" : "Last name not found",
    "103" : "Email field not found",

    "111" : "first_name don't match (contains special chars)",
    "112" : "last_name don't match (contains special chars)",
    "113" : "email field don't match",

    "121" : "User not found",

    "201" : "Insert was fail",
    "202" : "Update was fail"
  }
}


File list
-------------
web_server_express.js   web script to launch
config/default.json     config file
modules/db.js     work with MongoDB database
modules/models.js validator module
modules/types.js  types to validate
package.json      package information
readme.txt        this readme


Created by
-------------
Dimitry, 2@ivanoff.org.ua
curl -A cv ivanoff.org.ua

