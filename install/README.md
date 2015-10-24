# Database schema

## Restore from files

mongorestore -h <url> -d <database> -u <user> -p <password> db

## Creating in mongo

db.users.insert( {"_id":"2a0722fd-88b4-430f-928f-94f512676e4b", "login":"admin", "password":"21232f297a57a5a743894a0e4a801fc3", "type":"admin", "email":"admin@localhost","name":{"first":"Admin","last":""}} );

db.users.createIndex( { login : 1 }, { unique: true } );

db.users.createIndex( { email : 1 }, { unique: true } );


db.assets.insert( {"_id":"baaebc3a-c953-4d96-8150-8068accfe1e4",userId:"2a0722fd-88b4-430f-928f-94f512676e4b",path:"",name:"New Folder",type:"folder",size:0,parentId:""} );

db.assets.createIndex( { userId : 1, path : 1, name : 1 }, { unique: true } );


db.resources.insert( { userId:"2a0722fd-88b4-430f-928f-94f512676e4b",assetType:"_total",count:1,totalSize:0 } );

db.resources.insert( { userId:"2a0722fd-88b4-430f-928f-94f512676e4b",assetType:"folder",count:1,totalSize:0 } );

db.resources.createIndex( { userId : 1, assetType : 1 }, { unique: true } );

db.options.insert( { limit : { files : { user : 100, guest : 3 }, size : { user : 10000000, guest : 100000 } } } );
