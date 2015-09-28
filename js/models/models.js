
// All types defenition
var Types = {
    // uuid methods
    uuid : {
        // uuid.generate returns new UUID 
        generate : function(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },
        // uuid.check returns true if parameter looks like UUID, false otherwise 
        check : function( uuid ){
            return uuid && uuid.match(/^[\da-z]{8}-[\da-z]{4}-4[\da-z]{3}-[\da-z]{4}-[\da-z]{12}$/)?
                true : false;
        },
    },
    // string properties and methods
    string : {
        // string.min Minimum length of the string
        min   : 0,
        // string.max Maximum length of the string
        max   : Infinity,
        // string.check check sting type and size
        check : function( string ){
            if ( ( typeof string === 'string' || string instanceof String )
                    && string.length >= this.min 
                    && string.length <= this.max ) 
                return true
            else 
                return false;
        },
    },
    // number properties and methods
    number : {
        // number.min Minimum number value
        min   : -Infinity,
        // number.max Maximum number value
        max   : Infinity,
        // number.check check number type and size
        check : function( number ){
            return !isNaN(parseFloat( number )) && number >= this.min && number <= this.max ? 
                true : false;
        },
    },
    // date methods
    date : {
        // date.check Maximum length of the string
        check : function( date ){
            return date instanceof Date && typeof date.getMonth === 'function'?
                true : false;
        },
    },
}


var myLibrary = Object.create( Types );

myLibrary.errors = [];
myLibrary.registeredModels = Object.create({});

myLibrary.registerModel = function ( modelName, modelObject ) {
    // check for name, object and if model already exists
    if ( ! modelName ) {
        throw new Error('Name is undefined');
    }
    if ( ! modelObject ) {
        throw new Error('Model in "'+ modelName +'" is undefined');
    }
    if ( this.registeredModels[ modelName ] ) {
        throw new Error('Model "'+ modelName +'" is already registered');
    }

    console.log( 'Try to create model "' + modelName +'" with fields and types:');
    var o = Object.create( modelObject );
    for( var key in o ){
        console.log( '  "' + key + '" : "' + o[key].type + '"');
        // check type and if it's in Types
        if ( !o[key].type ) {
            throw new Error('No field "type" in key "'+ key +'" in model "'+ modelName +'"');
        }
        if ( ! this[ o[key].type ] ) {
            throw new Error('No type "'+ o[key].type +'" in Types: key "'+ key +'" in model "'+ modelName+'"');
        }
        // check for range in new object
        if ( typeof o[key].min !== 'undefined' 
                && typeof this[ o[key].type ].min !== 'undefined' 
                && this[ o[key].type ].min > o[key].min ) {
            throw new Error('In model "'+ modelName +'", key "'+ key +'" minimal value ( '+ o[key].min +' ) is less than acceptable minimal in Types'
                            + ' ( ' + this[ o[key].type ].min + ' )' );
        }
        if ( typeof o[key].max !== 'undefined' 
                && typeof this[ o[key].type ].max !== 'undefined' 
                && this[ o[key].type ].max < o[key].max ) {
            throw new Error('In model "'+ modelName +'", key "'+ key +'" maximal value ( '+ o[key].max +' ) is in excess of maximal acceptable value in Types'
                            + ' ( ' + this[ o[key].type ].min + ' )' );
        }

        // get properties and methods from Types
        for( var key_parent in this[ o[key].type ] ){
            if ( !o[ key ][ key_parent ] ) {
                o[ key ][ key_parent ] = this[ o[key].type ][ key_parent ];
            }
        }
    }

    this.registeredModels[ modelName ] = o;

    console.log( '+Model "' + modelName +'" was registered');
}

myLibrary.showModels = function( full ) {
    if ( ! this.registeredModels ) {
        console.log( 'There is no registered models' );
    } else {
        console.log( 'List of registered models' );
        for( var modelName in this.registeredModels ){
            console.log( '  - ' + modelName );
            if( full ) {
                for( var key in this.registeredModels[ modelName ] ){
                    console.log( '      ' + key + ' : ' + this.registeredModels[ modelName ][ key ].type );
                }
            }
        }
    }
}

myLibrary.showModelsFull = function() {
    this.showModels( 1 );
}

myLibrary.validate = function( modelName, entity ) {
    var modelObject = this.registeredModels[ modelName ];
    // check for required field
    for( var key in modelObject ){
        if( modelObject[ key ].required && !entity[ key ] ) {
            this.errors.push( 'Required field "'+ key +'" not found in model "'+ modelName+'"' );
        }
    }
    // check for exists and macth
    for( var key in entity ){
        if( !modelObject[ key ] ) {
            this.errors.push( 'Field "'+ key +'" not found in model "'+ modelName+'"' );
        }
        else if( !modelObject[ key ].check( entity[ key ] ) ) {
            this.errors.push( 'Field "'+ key +'" not matched with type "'+ modelObject[ key ].type +'" in model "'+ modelName+'"' );
        }
    }
    return this.errors.length? false : true;
}

myLibrary.dispose = function() {
    this.registeredModels = null;
    console.log( 'All modules are removed' );
}

myLibrary.showErrors = function() {
    console.log( 'Errors:' );
    console.log( '  ' + this.errors.join("\n  ") );
    this.errors = [];
}

myLibrary.consoleTrueOrError = function( validated ) {
    if ( validated ) { 
        console.log( 'true' )
    } else { 
        this.showErrors() 
    }
}


// Main body

myLibrary.registerModel( "user", {
  id:   { type: "uuid", required: true },        // property “id” must be uuid and always must be present in given entity
  name: { type: "string", min: 1, max: 64 },     // property “name” must be String and contain 1-64 characters, optional
  createdAt: { type: "date" },                   // property “createdAt” must be a date, optional
  counter:   { type: "number", min: 0, max: 64 },// property “counter” must be a Number and greater or equal to Zero, optional
} );


myLibrary.registerModel( "user2", {
  id:   { type: "uuid", required: true },        // property “id” must be uuid
  name: { type: "string", min: 4, max: 128 },    // property “name” must be String and contain 4-128
} );

myLibrary.showModelsFull();

console.log( 'Check 1:' );
myLibrary.consoleTrueOrError ( 
    myLibrary.validate( "user", {
      id    : "61cecfb4-da43-4b65-aaa0-f1c3be81ec53",
      name  : "Alex Bardanov",
      createdAt : new Date(),
      counter   : 0,
    }) 
);

console.log( 'Check 2:' );
myLibrary.consoleTrueOrError ( 
    myLibrary.validate( "user", { id : "61cecfb4-da33-4b15-aa10-f1c6be81ec53", name : "Dimitry Ivanov", }) 
);

/// Required field key not found exception
console.log( 'Check 3:' );
myLibrary.consoleTrueOrError ( myLibrary.validate( "user", { name  : "Alex Bardanov" }) );

/// 2 errors: Field not matched with type exception and Field not found
console.log( 'Check 4:' );
myLibrary.consoleTrueOrError ( myLibrary.validate( "user", { id : "1cecfb4-da43-4b65-aaa0-f1c3be81ec53", imya : "Alex Bardanov" }) );


myLibrary.dispose();

myLibrary.showModels();


