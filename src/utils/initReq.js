var qs = require('qs'),
  methods = require('./methods'),
  includes = require('./includes'),
  sterilize = require('./sterilize');

/**
 * initialize req object
 * @param  {String} origReqBody.method
 * @param  {String} origReqBody.url
 * @param  {Object} origReqBody.body
 * @return {Request}
 */
module.exports = function initReq(origReqBody) {
  var reqBody = sterilize(origReqBody),
    method = reqBody.method,
    url = reqBody.url,
    body = reqBody.body || {};

  if (!method || !url) {
    throw new Error('Missing method or url');
  }
  if (!includes(methods, method.toLowerCase())) {
    throw new Error('Method not supported');
  }

  var urlSplit = url.split('?'),
    path = urlSplit[0],
    query = qs.parse(urlSplit[1]);

  return {
    method: method.toUpperCase(),
    body: body,
    originalUrl: url,
    path: path,
    query: query
    // params: {} // will be generated dynamically
  };
};
