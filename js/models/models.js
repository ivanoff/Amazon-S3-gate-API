
/****
 Export JavaScript library to validate Objects
 Usage:
    myLibrary = require( './models' );
****/

// Get all types defenition from types.js
var Types = require( './types' );
exports.types = Types.list;

exports.errors = [];
exports.registeredModels = [];

// Register new model. 
// Parameters: modelName - name of the model, modelObject - model object
//      .registeredModels property has information about all registered modules
//      Each module must have unique name of the model till .dispose them
// Usage:
//      myLibrary.registerModel( "user", {
//        id:   { type: "uuid", required: true },        // property “id” must be uuid
//        name: { type: "string", min: 4, max: 128 },    // property “name” must be String and contain 4-128
//      } );
exports.registerModel = function ( modelName, modelObject ) {
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
        if ( ! this.types[ o[key].type ] ) {
            throw new Error('No type "'+ o[key].type +'" in Types: key "'+ key +'" in model "'+ modelName+'"');
        }
        // check for range in new object
        if ( typeof o[key].min !== 'undefined' 
                && typeof this.types[ o[key].type ].min !== 'undefined' 
                && this.types[ o[key].type ].min > o[key].min ) {
            throw new Error('In model "'+ modelName +'", key "'+ key +'" minimal value ( '+ o[key].min +' ) is less than acceptable minimal in Types'
                            + ' ( ' + this.types[ o[key].type ].min + ' )' );
        }
        if ( typeof o[key].max !== 'undefined' 
                && typeof this.types[ o[key].type ].max !== 'undefined' 
                && this.types[ o[key].type ].max < o[key].max ) {
            throw new Error('In model "'+ modelName +'", key "'+ key +'" maximal value ( '+ o[key].max +' ) is in excess of maximal acceptable value in Types'
                            + ' ( ' + this.types[ o[key].type ].min + ' )' );
        }

        // get properties and methods from Types
        for( var key_parent in this.types[ o[key].type ] ){
            if ( !o[ key ][ key_parent ] ) {
                o[ key ][ key_parent ] = this.types[ o[key].type ][ key_parent ];
            }
        }
    }

    this.registeredModels[ modelName ] = o;

    console.log( '+Model "' + modelName +'" was registered');
}

// Show information of registered models. All registered models are stored in .registeredModels
// If params.displayEverything is true, module will show additional info
// Usage:
//      myLibrary.showModels();
exports.showModels = function( params ) {
    if ( ! this.registeredModels ) {
        console.log( 'There is no registered models' );
    } else {
        console.log( 'List of registered models' );
        for( var modelName in this.registeredModels ){
            console.log( '  - ' + modelName );
            if( params.displayEverything ) {
                for( var key in this.registeredModels[ modelName ] ){
                    console.log( '      ' + key + ' : ' + this.registeredModels[ modelName ][ key ].type );
                }
            }
        }
    }
}

// Show expanded information of registared models
// Usage:
//      myLibrary.showModelsExpanded();
exports.showModelsExpanded = function() {
    this.showModels( { displayEverything: true } );
}

// Check if entity pass modelName's validation
// Usage:
//      myLibrary.validate( "user", { id : "61cecfb4-da33-4b15-aa10-f1c6be81ec53", name : "Dimitry Ivanov" }) 
exports.validate = function( modelName, entity ) {
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
    return !this.errors.length;
}

// "Forget" about all registered models
// Usage:
//     myLibrary.dispose();
exports.dispose = function() {
    this.registeredModels = [];
    console.log( 'All modules are removed' );
}

// In console show all accumulated errors, and erase them
// Usage:
//      myLibrary.showErrors();
exports.showErrors = function() {
    console.log( 'Errors:' );
    console.log( '  ' + this.errors.join("\n  ") );
    this.errors = [];
}

// If validated is true, then show "true" in console, show all errors, otherwise
// Usage:
//      myLibrary.consoleTrueOrError ( 
//          myLibrary.validate( "user", { id : "61cecfb4-da33-4b15-aa10-f1c6be81ec53", name : "Dimitry Ivanov", }) 
//      );
exports.consoleTrueOrError = function( validated ) {
    if ( validated ) { 
        console.log( 'true' )
    } else { 
        this.showErrors() 
    }
}
