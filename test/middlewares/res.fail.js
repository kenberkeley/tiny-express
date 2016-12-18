module.exports = function (req, res, next) {
  res.fail = function (errMsg) {
    res.send({
      succues: false,
      errMsg: errMsg
    });
  };
};
