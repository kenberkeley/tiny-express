// var should = require('chai').should();

var tinyExpress = require('../'),
  app = tinyExpress();

app.use(function (req, res, next) {
  console.info('111111');
  console.log(this);
  next()
})
app.use(function (req, res, next) {
  console.info('222222');
  console.log(this);
  next()
})
app.use(function(req, res) {
  console.log(this);
  res.send('ok')
})

// app.use(function(err, req, res, next) {
//   console.log(this)
//   res.send(err)
// })

app
  .receive({ method: 'GET', url: '/', body: {a: 1} })
  .respond(function (re) {
    console.log('respond', re)
  })

// describe('# Msg CURD Test #', function() {
//   it('should respond ok', function(done) {
//     app.receive({ method: 'get', url: '/' }, function (res) {
//       res.should.equal('ok');
//     });
//   });
// });
测试：
1. 不存在任何中间件
2. 仅存在错误处理中间件
3. 正常中间件+错误处理 next
4. 正常中间件 res / next
5. 调用多次 res.send