module.exports = function (req, res, next) {
  res.fail = function (errMsg) {
    res.send({
      success: false,
      errMsg: errMsg
    });
  };
  next();
};
