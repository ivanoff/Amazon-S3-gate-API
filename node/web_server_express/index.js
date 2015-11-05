var server = require('./server' );

server.start( function(){
  // If you want to test or limit server work time, uncomment line below
  // setTimeout( function(){console.log('3 seconds fall');server.stop();}, 3000);
} );


