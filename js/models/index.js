
myLibrary = require( './models' );

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

/*// Password example
myLibrary.registerModel( "user3", {
  id:   { type: "uuid", required: true },                        // property “id” must be uuid
  name: { type: "string", min: 4, max: 128, required: true },    // property “name” must be String and contain 4-128
  name: { type: "password", min: 4, required: true  },         // property “password” must be String and contain not less than 4 characters
} );
*/

/*// Exceptions examples
/// Required field key not found exception
myLibrary.consoleTrueOrError ( myLibrary.validate( "user", { name  : "Alex Bardanov" }) );

/// 2 errors: Field not matched with type exception and Field not found
myLibrary.consoleTrueOrError ( myLibrary.validate( "user", { id : "1cecfb4-da43-4b65-aaa0-f1c3be81ec53", imya : "Alex Bardanov" }) );

/// Size minimum check error
myLibrary.consoleTrueOrError ( myLibrary.validate( "user", { id : "61cecfb4-da43-4b65-aaa0-f1c3be81ec53", name : "" }) );

/// Size maximum check error
myLibrary.consoleTrueOrError ( myLibrary.validate( "user", { id : "61cecfb4-da43-4b65-aaa0-f1c3be81ec53", name : "ASNKJW oew  owek rewRWIWJG OERGMLkf gsojejrwoeg ke r gerEGIOJWgij i4 ggr" }) );

/// undefined username exception
myLibrary.registerModel( undefined, { id: { type: "uuid", required: true } } );

// undefined model exception
myLibrary.registerModel( "name_exception", NaN );

/// name duplicate exception
myLibrary.registerModel( "user", { id: { type: "uuid", required: true } } );

// no type field exception
myLibrary.registerModel( "name_exception", { date: { parameter: "date" } } );

// no guid type exception
myLibrary.registerModel( "name_exception", { id: { type: "guid" } } );

// minimum value less than required exception
myLibrary.registerModel( "name_exception", { name: { type: "string", min: -11, max: 64 } } );
*/


myLibrary.dispose();

myLibrary.showModels();


