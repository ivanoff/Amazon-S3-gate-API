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

  var userId, folderId, fileId;
  describe('Add user and assets', function () {
    it('Add user Max', function (done) {
        request(url)
        .post('/users')
        .send({ "name":{"first":"Max","last":"Testing"},"email":"test@tt.oo" })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect('Location', /\/users\/[a-f0-9\-]{36}/)
        .end(function(err,res) {
            if (err) {
                throw( err );
            }
            res.body.should.have.property('_id');
            res.body.name.first.should.equal('Max');
            userId=res.body._id;
            done();
        });
    });
    it('Add video folder to root folder for user Max', function (done) {
        request(url)
        .post('/users/'+userId+'/assets')
        .send({"name":"video","type":"folder"})
        .expect(201)
        .expect('Content-Type', /json/)
        .expect('Location', /\/users\/[a-f0-9\-]{36}\/assets\/[a-f0-9\-]{36}/)
        .end(function(err,res) {
            if (err) {
                throw( err );
            }
            res.body.should.have.property('_id');
            res.body.name.should.equal('video');
            folderId=res.body._id;
            done();
        });
    });
    it('Add file hotfuzz.avi to video folder', function (done) {
        request(url)
        .post('/users/'+userId+'/assets/'+folderId)
        .send({"name":"hotfuzz.avi","type":"video","size":720000000})
        .expect(201)
        .expect('Content-Type', /json/)
        .expect('Location', /\/users\/[a-f0-9\-]{36}\/assets\/[a-f0-9\-]{36}/)
        .end(function(err,res) {
            if (err) throw( err );
            res.body.should.have.property('_id');
            res.body.name.should.equal('hotfuzz.avi');
            fileId=res.body._id;
            done();
        });
    });
  });

  describe('List of users', function () {
    it('List all', function (done) {
        request(url)
        .get('/users')
        .expect(200, done);
    });
  });

  describe('Delete all new added data', function () {
    it('Delete file', function (done) {
        request(url)
        .delete('/users/'+userId+'/assets/'+fileId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
            if (err) throw( err );
            res.body.should.have.property('_id');
            res.body._id.should.equal(fileId);
            done();
        });
    });
    it('Delete folder', function (done) {
        request(url)
        .delete('/users/'+userId+'/assets/'+folderId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
            if (err) throw( err );
            res.body.should.have.property('_id');
            res.body._id.should.equal(folderId);
            done();
        });
    });
    it('Delete user', function (done) {
        request(url)
        .delete('/users/'+userId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
            if (err) throw( err );
            res.body.should.have.property('_id');
            res.body._id.should.equal(userId);
            done();
        });
    });
  });

  describe('Errors testing', function () {
    it('should 404 correctly', function (done) {
        request(url)
        .post('/no_page_at.all')
        .expect(404, done);
    });
  });

});

