module.exports = function (req, res, next) {
  res.success = function (data) {
    res.send({
      succues: true,
      data: data
    });
  };
};
