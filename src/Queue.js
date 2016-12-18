function Queue(req, res, queue) {
  if (!(this instanceof Queue)) {
    return new Queue(req, res, queue);
  }
  this.req = req;
  this.res = res;
  this.queue = queue;
}

var proto = Queue.prototype;

proto.run = function (err) {
  if (!this.queue.length) {
    throw new Error('No middlewares for next');
  }
  if (err) return this.handleErr(err);

  var mdw = this.queue.shift();
  if (mdw.length === 4) {
    throw new Error('No middlewares but errHandler for next');
  }
  mdw.call(mdw, this.req, this.res, this.run.bind(this));
};

proto.handleErr = function (err) {
  var errHandlers = this.queue.filter(function (mdw) {
    return mdw.length === 4;
  });

  if (!errHandlers.length) {
    throw new Error('Error handler (with 4 arguments) not found');
  }
  if (errHandlers.length > 1) {
    throw new Error('You can only set ONE error handler');
  }

  var eH = errHandlers[0];
  eH.call(eH, err, this.req, this.res, this.run.bind(this));
};

module.exports = Queue;
