var typeOf = require('./utils/typeOf'),
  methods = require('./utils/methods'),
  initReq = require('./utils/initReq'),
  once = require('./utils/once'),
  Router = require('./Router'),
  Queue = require('./Queue');

function TinyExpress () {
  if (!(this instanceof TinyExpress)) {
    return new TinyExpress();
  }
  this.router = new Router();

  // global Middlewares
  this.beforeMiddlewares = [];
  this.afterMiddlewares = [];

  // the below properties will be defined in proto.receive
  // this.req
  // this.res
  // this.callback
}

var proto = TinyExpress.prototype;

/**
 * we support these invocations:
 * app.use(<globalMiddleware>)
 * app.use(<route[]>)
 * app.use(<route>)
 */
proto.use = function (fn) {
  switch (typeOf(fn)) {
    case 'function':
      this[
        (this.router.isEmpty() ? 'before' : 'after') +
        'Middlewares'
      ].push(fn);
      break;
    case 'array':
      this.router.reset(fn);
      break;
    case 'object':
      this.router.add(fn);
      break;
    default:
      throw new Error('Type of fn not supported');
  }
};

// app.VERB(<path>, <middleware[]?>, handler)
methods.forEach(function (method) {
  proto[method] = function (path, middlewares, handler) {
    var route = { method: method, path: path };
    route.handler = handler ? (
      handler && (route.middlewares = middlewares)
    ) : middlewares;

    this.router.add(route);
  };
});

/**
 * The only API exposed
 * @param  {String}     reqBody.method
 * @param  {String}     reqBody.url
 * @param  {Object}     reqBody.body?
 * @return {chainable}  respond
 */
proto.receive = function (reqBody) {
  var _this = this;
  
  this.req = initReq(reqBody);
  this.res = {
    send: once(function (re) {
      _this.callback(re);
    }, function () {
      throw new Error('res.send invoked more than once');
    }),
    json: function (re) {
      _this.res.send(JSON.stringify(re));
    }
  };

  var middlewares = this.router.match(this.req);
  var queue = this.beforeMiddlewares.concat(
    middlewares, this.afterMiddlewares
  );

  return {
    respond: function (callback) {
      if (typeOf(callback) !== 'function') {
        throw new Error('No callback provided');
      }
      _this.callback = callback;
      // Run the queue for this request
      (new Queue(_this.req, _this.res, queue)).run();
    }
  };
};

module.exports = TinyExpress;
