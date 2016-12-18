/**
 * generate req.params after a route is matched with req.path
 * doc 's here => https://github.com/pillarjs/path-to-regexp
 * @param  {Array}  paramKeys
 * @param  {Array}  matchedResult
 * @return {Object}
 */
module.exports = function getParams(paramKeys, matchedResult) {
  var params = {};

  paramKeys.forEach(function(key, idx) {
    params[key.name] = matchedResult[idx + 1];
  });

  return params;
};
