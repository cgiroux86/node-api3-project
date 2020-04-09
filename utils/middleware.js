const logger = (req, res, next) => {
  const time = new Date().toString();
  const url = req.path;
  const reqType = req.method;
  console.log(`time: ${time}, url: localhost:5005${url}, type: ${reqType}`);
  next();
};

module.exports = logger;
