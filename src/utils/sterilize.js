/**
 * cut the reference of complex data structures
 * @param  {Any} entity
 * @return {Any}
 */
module.exports = function sterilize(entity) {
  return JSON.parse(JSON.stringify(entity));
};
