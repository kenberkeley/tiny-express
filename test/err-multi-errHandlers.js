var expect = require('chai').expect,
  tinyExpress = require('../'),
  app = tinyExpress();

var errHandler = require('./handlers/errHandler');

describe('# Error: multi errHandlers', function () {
  it('## should throw error', function () {
    expect(function () {
      app.use(errHandler);
      app.use(errHandler);

      app
        .receive({ method: 'get', url: '/foo' })
        .respond(function () { /* whatever */ });
    })
    .to.throw('You can only set ONE error handler');
  });
});
