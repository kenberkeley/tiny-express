var expect = require('chai').expect,
  tinyExpress = require('../'),
  app = tinyExpress();

describe('# Error: app.use(<invalid arg>)', function () {
  it('## Type of fn not supported', function () {
    expect(function () {
      app.use(true);
    })
    .to.throw('Type of fn not supported');
  });
});
