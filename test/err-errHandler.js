var expect = require('chai').expect,
  tinyExpress = require('../'),
  app = tinyExpress();

var errHandler = require('./handlers/errHandler');

app.use(function(req, res, next) {
  next({ err: true });
});

describe('# Error: errHandler', function () {
  it('## Error handler (with 4 arguments) not found', function () {
    expect(function () {
      app.receive({ method: 'get', url: '/' }).respond(function () {/* whatever */});
    })
    .to.throw('Error handler (with 4 arguments) not found');
  });

  it('## You can only set ONE error handler', function () {
    app.use(errHandler);
    app.use(errHandler);
    expect(function () {
      app.receive({ method: 'get', url: '/' }).respond(function () {/* whatever */});
    })
    .to.throw('You can only set ONE error handler');
  });
});
