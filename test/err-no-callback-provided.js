var expect = require('chai').expect,
  tinyExpress = require('../'),
  app = tinyExpress();

describe('# Error: no callback provided', function () {
  it('## No callback provided', function () {
    expect(function () {
      app
        .receive({ method: 'get', url: '/foo/bar' })
        .respond();
    })
    .to.throw('No callback provided');
  });
});
