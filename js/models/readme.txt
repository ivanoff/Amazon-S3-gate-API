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

There is instruction to validate new object in "Validate object" article.

If you need add new type, please follow to "Add type" article.


Module description
-------------
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
"Types" properties located in types.js and included description to validate of each type 
( "min" and "max" properties, add "check" method to check validation ).


Add type
-------------
If you need add new type, you can do it in Types variable in types.js. Be shure to add "check" method 
to check new inserted type. Also you can add "min" and "max" properties to check length.

For example, new type "password". It type must contains minimum 4 chars: at least one lower 
and one upper case, digit and special chars.
Add code below to types.js in list property:
password : {
    min   : 4,         // string.min Minimum length of the string
    max   : Infinity,  // string.max Maximum length of the string
    check : function( password ){   // check password type and size
        if ( ( typeof string === 'string' || string instanceof String )
                && string.length >= this.min 
                && string.length <= this.max 
                && string.match(/((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).+)/) 
        ) 
            return true
        else 
            return false;
    },
},


Register model
-------------
For register model you need to use registerModel method.

myLibrary.registerModel( "user_password", {
  id:   { type: "uuid", required: true },     // property “id” must be uuid
    // property “name” must be String and contain 4-128
  name: { type: "string", min: 4, max: 128, required: true }, 
    // property “password” must be String and contain 4-128 chars: 
    // at least one lower and one upper case, digit and special chars.
  password: { type: "password", max: 128, required: true },       
} );


Validate object  
-------------
If you want validate new object, then insert before "myLibrary.dispose();" line:
myLibrary.consoleTrueOrError ( myLibrary.validate( "user", "entity" ) );

For example, validate based on "user" model:
myLibrary.consoleTrueOrError ( 
    myLibrary.validate( "user", { id : "61cecfb4-da33-4b15-aa10-f1c6be81ec53", name : "Dimitry Ivanov", password : "A1z!" }) 
);


Exceptions
-------------
Name is undefined
    myLibrary.registerModel( "Name", { id: { type: "uuid", required: true } } );

Model in "modelName" is undefined
    myLibrary.registerModel( "modelName", NaN );

Model "modelName" is already registered
    myLibrary.registerModel( "modelName", { id: { type: "uuid", min: 1, max: 5, required: true } } );
    myLibrary.registerModel( "modelName", { id: { type: "name" } } );

No field "name" in key "name" in model "modelName"
    myLibrary.consoleTrueOrError ( myLibrary.validate( "modelName", { name  : "Alex Bardanov" }) );

No type field exception
    myLibrary.registerModel( "name_exception", { date: { parameter: "date" } } );

No guid type exception
    myLibrary.registerModel( "name_exception", { id: { type: "guid" } } );


Errors
-------------
Required field "key" not found in model "modelName"
Field "key" not found in model "modelName"
Field "key" not matched with type "type" in model "modelName"
    2 errors: Field not matched with type exception and Field not found
        myLibrary.consoleTrueOrError ( myLibrary.validate( "user", { id : "1cecfb4-da43-4b65-aaa0-f1c3be81ec53", imya : "Alex Bardanov" }) );
    Size minimum check error
        myLibrary.consoleTrueOrError ( myLibrary.validate( "user", { id : "61cecfb4-da43-4b65-aaa0-f1c3be81ec53", name : "" }) );
    Size maximum check error
        myLibrary.consoleTrueOrError ( myLibrary.validate( "user", { id : "61cecfb4-da43-4b65-aaa0-f1c3be81ec53", name : "ASNKJW oew  owek rewRWIWJG OERGMLkf gsojejrwoeg ke r gerEGIOJWgij i4 ggr" }) );


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
index.js    script with examples
models.js   script with library
types.js    list of types
readme.txt  this readme


Created by
-------------
Dimitry, 2@ivanoff.org.ua
curl -A cv ivanoff.org.ua

