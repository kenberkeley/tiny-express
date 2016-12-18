var toString = Object.prototype.toString,
  reg = /^\[object\s(\w+)\]$/;

/**
 * a better typeof
 * @param  {Any}    entity
 * @return {String} its type
 */
module.exports = function typeOf(entity) {
  return reg.exec(toString.call(entity))[1].toLowerCase();
};
