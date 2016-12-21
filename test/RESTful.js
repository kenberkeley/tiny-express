var expect = require('chai').expect,
  tinyExpress = require('../');

var errHandler = require('./handlers/errHandler'),
  resSuccess = require('./middlewares/res.success'),
  resFail = require('./middlewares/res.fail');

function appGen() {
  var app = tinyExpress();
  app.use(resSuccess);
  app.use(resFail);
  return app;
}

describe('# RESTful API test', function () {
  it('## GET with res.send', function (done) {
    var app = appGen();

    var addXXXToReqBody = function (req, res, next) {
      req.XXX = 'YYY';
      next();
    };

    app.get('/post/:postId', addXXXToReqBody, function (req, res) {
      res.send(req);
    });

    app.receive({
      method: 'get',
      url: '/post/1010?author=ken&time=today'
    }).respond(function (re) {
      expect(re).to.eql({
        method: 'GET',
        params: { postId: '1010' },
        query: { author: 'ken', time: 'today' },
        XXX: 'YYY',
        body: {},
        path: '/post/1010',
        originalUrl: '/post/1010?author=ken&time=today'
      });
      done();
    });
  });

  it('## POST with res.json', function (done) {
    var app = appGen();

    var addYYYToReqBody = function (req, res, next) {
      req.YYY = 'ZZZ';
      next();
    };

    app.use([{
      method: 'post',
      url: '/post/:postId',
      middleware: addYYYToReqBody,
      handler: function (req, res) {
        res.json(req);
      }
    }]);

    app.receive({
      method: 'post',
      url: '/post/1010?author=ken&time=today',
      body: { foo: 'bar' }
    }).respond(function (re) {
      expect(re).to.equal(JSON.stringify({
        method: 'POST',
        params: { postId: '1010' },
        query: { author: 'ken', time: 'today' },
        YYY: 'ZZZ',
        body: { foo: 'bar' },
        path: '/post/1010',
        originalUrl: '/post/1010?author=ken&time=today'
      }));
      done();
    });
  });

  it('## PUT', function (done) {
    var app = appGen();

    var addZZZToReqBody = function (req, res, next) {
      req.ZZZ = 'AAA';
      next();
    };

    var addAAAToReqBody = function (req, res, next) {
      req.AAA = 'BBB';
      next();
    };

    app.use({
      method: 'put',
      url: '/post/:postId',
      middlewares: [addZZZToReqBody, addAAAToReqBody],
      handler: function (req, res) {
        res.json(req);
      }
    });

    app.receive({
      method: 'put',
      url: '/post/1010?author=ken&time=today',
      body: { foo: 'bar' }
    }).respond(function (re) {
      expect(re).to.equal(JSON.stringify({
        method: 'PUT',
        params: { postId: '1010' },
        query: { author: 'ken', time: 'today' },
        ZZZ: 'AAA',
        AAA: 'BBB',
        body: { foo: 'bar' },
        path: '/post/1010',
        originalUrl: '/post/1010?author=ken&time=today'
      }));
      done();
    });
  });

  it('## DELETE', function (done) {
    var app = appGen();

    app.use({
      method: 'delete',
      url: '/post/:postId',
      handler: function (req, res) {
        res.json(req);
      }
    });

    app.receive({
      method: 'put',
      url: '/post/1010?author=ken&time=today',
      body: { foo: 'bar' }
    }).respond(function (re) {
      expect(re).to.equal(JSON.stringify({
        method: 'DELETE',
        params: { postId: '1010' },
        query: { author: 'ken', time: 'today' },
        body: { foo: 'bar' },
        path: '/post/1010',
        originalUrl: '/post/1010?author=ken&time=today'
      }));
      done();
    });
  });

  it('## Next to errHandler', function (done) {
    var app = appGen();

    app.use(function (req, res, next) {
      next({ foo: 'bar' });
    });
    app.use(errHandler);

    app.receive({ method: 'get', url: '/' }).respond(function (re) {
      expect(re).to.eql({
        err: {
          foo: 'bar'
        }
      });
      done();
    });
  });

});
