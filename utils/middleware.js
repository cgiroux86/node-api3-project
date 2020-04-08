const logger = (req, res, next) => {
  const time = new Date().toString();
  const url = req.originalUrl;
  const reqType = req.mehtod;
  console.log(`time: ${time}, url: ${url}, type: ${reqType}`);
  next();
};

module.exports = logger;
