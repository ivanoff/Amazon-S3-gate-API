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

  describe('Add guest user for checking more modules', function () {
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
    it('Add new guest user', function (done) {
        async.waterfall([
            function(callback){
                request(url)
                .post('/users')
                .set( 'x-access-token', vars.token )
                .send({ "login":"guest001", "password" : "guest001", "type":"guest", "name":{"first":"Guesl","last":"Guesting"}, "email":"guest001@tt.oo" })
                .expect(201)
                .expect('Content-Type', /json/)
                .expect('Location', /\/users\/[a-f0-9\-]{36}/)
                .end(function(err,res) {
                    if (err) {
                        throw( err );
                    }
                    res.body.should.have.property('_id');
                    res.body.type.should.equal('guest');
                    vars.userId = res.body._id;
                    done();
                });
            },
        ])
    });
    it('Get guest user token', function (done) {
        async.waterfall([
            function(callback){
                request(url)
                .post('/login')
                .send({ "login":"guest001","password":"guest001" })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err,res) {
                    if( err ) throw( err );
                    res.body.should.have.property('token');
                    vars.guestToken = res.body.token;
                    done();
                });
            },
        ])
    });

    it('Add video folder to root folder for user Guesl', function (done) {
        request(url)
        .post('/assets')
        .set( 'x-access-token', vars.guestToken )
        .send({"name":"video"})
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
            if (err) throw( err );
            res.body.should.have.property('_id');
            res.body.name.should.equal('video');
            res.body.type.should.equal('folder');
            vars.guestFolderId=res.body._id;
            done();
        });
    });
    it('Add folder private to video folder', function (done) {
        request(url)
        .post('/assets/'+vars.guestFolderId)
        .set( 'x-access-token', vars.guestToken )
        .send({"name":"private"})
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
            if (err) throw( err );
            res.body.should.have.property('_id');
            res.body.name.should.equal('private');
            res.body.type.should.equal('folder');
            vars.guestFolderId2=res.body._id;
            done();
        });
    });
    it('Add folder for my parents to private folder', function (done) {
        request(url)
        .post('/assets/'+vars.guestFolderId2)
        .set( 'x-access-token', vars.guestToken )
        .send({"name":"for my parents"})
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
            if (err) throw( err );
            res.body.should.have.property('_id');
            res.body.name.should.equal('for my parents');
            res.body.type.should.equal('folder');
            vars.guestFolderId3=res.body._id;
            done();
        });
    });
    it('Add folder for me to private folder', function (done) {
        request(url)
        .post('/assets/'+vars.guestFolderId)
        .set( 'x-access-token', vars.guestToken )
        .send({"name":"for me"})
        .expect(400, done);
    });
    it('List all files in root folder', function (done) {
        request(url)
        .get('/assets')
        .set( 'x-access-token', vars.guestToken )
        .expect(200, done);
    });
    it('List all files in video folder', function (done) {
        request(url)
        .get('/assets/'+vars.guestFolderId)
        .set( 'x-access-token', vars.guestToken )
        .expect(200, done);
    });
    it('List all files in for my parents folder', function (done) {
        request(url)
        .get('/assets/'+vars.guestFolderId2)
        .set( 'x-access-token', vars.guestToken )
        .expect(200, done);
    });
    it('Delete private folder', function (done) {
        request(url)
        .delete('/assets/'+vars.guestFolderId2)
        .set( 'x-access-token', vars.guestToken )
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
            if (err) throw( err );
            res.body.should.have.property('_id');
            res.body._id.should.equal(vars.guestFolderId2);
            done();
        });
    });
    it('List all files in for my parents folder', function (done) {
        request(url)
        .get('/assets'+vars.guestFolderId2)
        .set( 'x-access-token', vars.guestToken )
        .expect(404, done);
    });

    it('Delete guest user', function (done) {
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

// to-do add check uploaded file content
// to-do add move recursive folder or file
// to-do add remove recursive folder or file
// to-do add remove user and all folders and files his own

    it('List all files in root folder', function (done) {
        request(url)
        .get('/assets')
        .set( 'x-access-token', vars.guestToken )
        .expect(403, done);
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

