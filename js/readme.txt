Models validator

What Is This?
-------------
JavaScript library to validate Objects


Install
-------------
1. Unpack all files from archive and cd to folder
tar zxf models.tar.gz
cd models


Usage
-------------
node models.js

If you want validate new object, then insert before "myLibrary.dispose();" line:
myLibrary.consoleTrueOrError ( myLibrary.validate( "user", "entity" ) );

If you need add new type, you can do it in Types variable. Be shure to add "check" method 
to check new inserted type. Also you can add "min" and "max" properties to check length.


Module description
-------------
myLibrary contains "Types" properties with description to validate of each type ( "min" and 
"max" properties, add "check" method to check validation ).
Methods and properties of myLibrary:
  registeredModels( modelName, modelObject ) - register model modelName with modelObject
  registeredModels - list of registered models
  validate( modelName, entity ) - validate model modelName with entity
  showModels( full ) - show information of registered models
  showModelsFull() - show full information of registered model
  dispose() - remove all registered modelNames
  errors - list of errors
  showErrors() - show all errors and clear list of errors
  consoleTrueOrError() - show true or list of errors in console
  

Exceptions
-------------
Name is undefined
Model in "modelName" is undefined
Model "modelName" is already registered
No field "type" in key "key" in model "modelName"
No type "type" in Types: key "key" in model "modelName"
In model "modelName", key "key" minimal value is less than acceptable minimal in Types
In model "modelName", key "key" maximal value is in excess of maximal acceptable value in Types


Errors
-------------
Required field "key" not found in model "modelName"
Field "key" not found in model "modelName"
Field "key" not matched with type "type" in model "modelName"


Output example
-------------
$ node -v
v0.10.40

$ node models.js 
Try to create model "user" with fields and types:
  "id" : "uuid"
  "name" : "string"
  "createdAt" : "date"
  "counter" : "number"
+Model "user" was registered
Try to create model "user2" with fields and types:
  "id" : "uuid"
  "name" : "string"
+Model "user2" was registered
List of registered models
  - user
      id : uuid
      name : string
      createdAt : date
      counter : number
  - user2
      id : uuid
      name : string
Check 1:
true
Check 2:
true
Check 3:
Errors:
  Required field "id" not found in model "user"
Check 4:
Errors:
  Field "id" not matched with type "uuid" in model "user"
  Field "imya" not found in model "user"
All modules are removed
There is no registered models


File list
-------------
models.js   script with library and examples
readme.txt  this readme


Created by
-------------
Dimitry, 2@ivanoff.org.ua
curl -A cv ivanoff.org.ua

