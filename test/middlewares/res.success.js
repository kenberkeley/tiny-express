module.exports = function (req, res, next) {
  res.success = function (data) {
    res.send({
      success: true,
      data: data
    });
  };
  next();
};
