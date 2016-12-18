/**
 * just like lodash 's _.includes
 * @param  {Array}  arr
 * @param  {Any}    item
 * @return {Boolean}
 */
module.exports = function includes(arr, item) {
  return arr.indexOf(item) !== -1;
};
