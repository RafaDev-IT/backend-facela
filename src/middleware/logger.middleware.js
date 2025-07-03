const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const route = req.originalUrl;
  
  console.log(`[${timestamp}] ${method} ${route}`);
  
  next();
};

module.exports = loggerMiddleware;