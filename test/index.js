var server = require('../server'),
    expect = require('chai').expect,
    request = require('supertest');

var url = "http://localhost:3000";

describe('web server express testing', function () {
  before(function ( done ) {
    server.start( function(){ done() } );
  });
  after(function () {
    server.stop();
  });

  describe('Add user and assets', function () {
    it('Get token', function (done) {
        request(url)
        .post('/login')
        .send({ "login":"admin","password":"admin" })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
            if (err) {
                throw( err );
            }
            res.body.should.have.property('token');
            this.token=res.body.token;
            done();
        });
    });
  });

  describe('Errors testing', function () {
    it('should 401 Unauthorized', function (done) {
        request(url)
        .post('/no_page_at.all')
        .expect(401, done);
    });
  });

});

