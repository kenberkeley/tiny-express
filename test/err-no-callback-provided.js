var expect = require('chai').expect,
  tinyExpress = require('../'),
  app = tinyExpress();

describe('# Error: no callback provided', function () {
  it('## should throw error', function () {
    expect(function () {
      app
        .receive({ method: 'get', url: '/foo/bar' })
        .respond();
    })
    .to.throw('No callback provided');
  });
});
