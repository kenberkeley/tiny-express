var expect = require('chai').expect,
  tinyExpress = require('../'),
  app = tinyExpress();

describe('# Error: invalid reqBody', function () {
  it('## Missing method or url', function () {
    expect(function () {
      app
        .receive({ foo: 'bar' })
        .respond(function () { /* whatever */ });
    })
    .to.throw('Missing method or url');
  });

  it('## Method not supported', function () {
    expect(function () {
      app
        .receive({ method: 'foo', url: '/bar' })
        .respond(function () { /* whatever */ });
    })
    .to.throw('Method not supported');
  });
});
