var server = require('../server');
var should = require('chai').should,
    expect = require('chai').expect,
    request = require('supertest');


describe('addition', function () {
  before(function ( done ) {
    server.start( function(){ done() } );
  });

  after(function () {
    server.stop();
  });

 describe('2addition', function () {
  it('should not 200 correctly', function (done) {
        request("http://localhost:3000")
        .get('/users')
        .expect(200, done);
  });

  it('should 404 correctly', function (done) {
        request("http://localhost:3000")
        .post('/tt')
        .expect(404, done);
  });
 });

});

