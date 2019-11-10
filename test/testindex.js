const ok = require('assert').ok
require('../src/index');
var app = require('http'); 
var server = app.createServer().listen(8080); 
const request = require('supertest').agent(server);

describe('Blog', function() {
    after(function() {
      server.close();
    });

    describe('GET /', function() {
        it('should see title "Test"', function(done) {
          request
          .get('/')
          .expect(200, function(err, res) {
            if (err) return done(err);
            ok(res.text.indexOf('<title>Test</title>') >= 0)
            done();
          });
        });

        /*
        it('should see 軟體工程 - 小法帝國', function(done) {
            request
            .get('/index.html')
            .expect(200, function(err, res) {
              if (err) return done(err);
      
              ok(res.text.indexOf('<h1>軟體工程 - 小法帝國</h1>') >= 0)
              done();
            });
          });
        });

        describe('Log in /login', function() {
          it('should see 登入 /', function(done) {
            request
            .get('/login')
            ok(res.text.indexOf('<h1>登入</h1>') >= 0)
            .end(function(err, res) {
              if (err) return done(err);
      
              ok(res.headers.location == '/')
              done();
            });
          });
        });

        describe('Register /register', function() {
          it('should see 註冊 /', function(done) {
            request
            .get('/register')
            ok(res.text.indexOf('<h1>註冊</h1>') >= 0)
            .end(function(err, res) {
              if (err) return done(err);
      
              ok(res.headers.location == '/')
              done();
            });
          });
        });*/
      })
});