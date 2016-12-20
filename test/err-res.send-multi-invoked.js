var expect = require('chai').expect,
  tinyExpress = require('../'),
  app = tinyExpress();

app.use(function (req, res) {
  res.send();
  res.send();
});

describe('# Error: res.send invoked more than once', function () {
  it('## res.send invoked more than once', function () {
    expect(function () {
      app
        .receive({ method: 'get', url: '/foo/bar' })
        .respond();
    })
    .to.throw('res.send invoked more than once');
  });
});
