var expect = require('chai').expect,
  tinyExpress = require('../'),
  app = tinyExpress();

var errHandler = require('./handlers/errHandler');

describe('# Error: no middlewares', function () {
  it('## No middlewares for next ', function () {
    expect(function () {
      app
        .receive({ method: 'get', url: '/foo' })
        .respond(function () { /* whatever */ });
    })
    .to.throw('No middlewares for next');
  });

  it('## No middlewares for next ', function () {
    expect(function () {
      app.get('/foo', function (req, res, next) {
        next();
      });

      app
        .receive({ method: 'get', url: '/foo' })
        .respond(function () { /* whatever */ });
    })
    .to.throw('No middlewares for next');
  });

  it('## No middlewares but errHandler for next', function () {
    expect(function () {
      app.use(errHandler);

      app
        .receive({ method: 'get', url: '/foo' })
        .respond(function () { /* whatever */ });
    })
    .to.throw('No middlewares but errHandler for next');
  });
});
