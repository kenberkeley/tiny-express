/**
 * just like lodash 's _.once
 * @param  {Function} fn
 * @param  {Function} afterFn(optional), when fn is invoked, take its place
 * @return {Function} one-off fn
 */
module.exports = function once(fn, afterFn) {
  var count = -1;
  afterFn = afterFn || function () {};

  return function () {
    var args = [].slice.call(arguments);
    ++count ? afterFn.apply(afterFn, args) : fn.apply(fn, args);
  };
};
