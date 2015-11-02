var server = require('../server'),
    expect = require('chai').expect,
    request = require('supertest'),
    async = require('async');

var url  = "http://localhost:3000",
    vars = {};

describe('web server express testing', function () {
  before(function ( done ) {
    server.start( function(){ done() } );
    vars = {}
  });
  after(function () {
    server.stop();
  });

  describe('Add user and assets', function () {
    var token;
    it('Get token', function (done) {
        async.waterfall([
            function(callback){
                request(url)
                .post('/login')
                .send({ "login":"admin","password":"admin" })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err,res) {
                    if( err ) throw( err );
                    res.body.should.have.property('token');
                    vars.token = res.body.token;
                    done();
                });
            },
        ])
    });

    it('Add new user', function (done) {
        async.waterfall([
            function(callback){
                request(url)
                .post('/users')
                .set( 'x-access-token', vars.token )
                .send({ "login":"test33", "password" : "123", "type":"guest", "name":{"first":"Max","last":"Testing"}, "email":"test@tt.oo" })
                .expect(201)
                .expect('Content-Type', /json/)
                .expect('Location', /\/users\/[a-f0-9\-]{36}/)
                .end(function(err,res) {
                    if (err) {
                        throw( err );
                    }
                    res.body.should.have.property('_id');
                    res.body.name.first.should.equal('Max');
                    vars.userId = res.body._id;
                    done();
                });
            },
        ])
    });

    it('Get users list', function (done) {
        async.waterfall([
            function(callback){
                request(url)
                .get( '/users' )
                .set( 'x-access-token', vars.token )
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err,res) {
                    if( err ) throw( err );
                    res.body.should.be.instanceof(Array);
                    done();
                });
            },
        ])
    });

    it('Delete user', function (done) {
        async.waterfall([
            function(callback){
                request(url)
                .delete('/users/'+vars.userId)
                .set( 'x-access-token', vars.token )
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err,res) {
                    if (err) throw( err );
                    res.body.should.have.property('_id');
                    res.body._id.should.equal( vars.userId );
                    done();
                });
            },
        ])
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

