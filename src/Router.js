var typeOf = require('./utils/typeOf'),
  pathToRegexp = require('path-to-regexp'),
  getParams = require('./utils/getParams');

function Router() {
  if (!(this instanceof Router)) {
    return new Router();
  }
  this.routes = [];
}

var proto = Router.prototype;

proto.add = function (route) {
  this.routes.push(route);
};

proto.reset = function (routes) {
  this.routes = routes || [];
};

proto.isEmpty = function () {
  return !this.routes.length;
};

/**
 * return middlewares that matched req.method and req.url
 * @param  {Object} req
 * @return {Array}  middlewares (including handler)
 */
proto.match = function (req) {
  console.log(this.routes);
  for (var i = 0; i < this.routes.length; i++) {
    var route = this.routes[i];

    if (route.method.toUpperCase() !== req.method) continue;

    var paramKeys = [],
      regex = pathToRegexp(route.path, paramKeys),
      matchedResult = regex.exec(req.path);

    if (!matchedResult) continue;
    // generate params dynamically
    req.params = getParams(paramKeys, matchedResult);

    var middlewares = route.middlewares || route.middleware || [],
      handler = route.handler || [];

    if (typeOf(middlewares) === 'function') {
      middlewares = [middlewares];
    }
    // handler middleware is located in the end of a route middlewares
    return middlewares.concat(handler);
  }

  // no routes matched
  return [];
};

module.exports = Router;
