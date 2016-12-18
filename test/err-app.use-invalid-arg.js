var expect = require('chai').expect,
  tinyExpress = require('../'),
  app = tinyExpress();

describe('# Error: app.use(<invalid arg>)', function () {
  it('## should throw error', function () {
    expect(function () {
      app.use(true);
    })
    .to.throw('Type of fn not supported');
  });
});
