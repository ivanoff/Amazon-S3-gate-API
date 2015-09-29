/****
 List of types to validate
 Created by:
    Dimitry, 2@ivanoff.org.ua
****/

exports.list = {

    uuid : { // uuid methods
        // uuid.check returns true if parameter looks like UUID, false otherwise 
        check : function( uuid ){
            return uuid && uuid.match(/^[\da-z]{8}-[\da-z]{4}-4[\da-z]{3}-[\da-z]{4}-[\da-z]{12}$/);
        },
    },

    string : { // string properties and methods
        min   : 0,        // string.min Minimum length of the string
        max   : Infinity, // string.max Maximum length of the string
        check : function( string ){ // string.check check sting type and size
            return (( typeof string === 'string' || string instanceof String )
                    && string.length >= this.min 
                    && string.length <= this.max );
        },
    },

    number : { // number properties and methods
        min   : -Infinity,   // number.min Minimum number value
        max   : Infinity,    // number.max Maximum number value
        check : function( number ){ // number.check check number type and size
            return typeof number === 'number' 
                    && number >= this.min 
                    && number <= this.max;
        },
    },

    date : { // date methods
        check : function( date ){  // date.check Maximum length of the string
            return date instanceof Date && typeof date.getMonth === 'function';
        },
    },

    email : { // uuid methods
        // uuid.check returns true if parameter looks like UUID, false otherwise 
        check : function( email ){
            return email && email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i);
        },
    },

}


