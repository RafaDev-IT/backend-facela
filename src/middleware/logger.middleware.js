const logger = require('../utils/logger');

const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const route = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  
  // Log en consola (mantenemos esto para desarrollo)
  console.log(`[${timestamp}] ${method} ${route}`);
  
  // Log en archivo
  logger.info('HTTP Request', {
    timestamp,
    method,
    route,
    ip,
    userAgent: req.get('user-agent'),
    body: req.body,
    query: req.query,
    params: req.params
  });
  
  // Capturar respuesta
  const originalSend = res.send;
  res.send = function(data) {
    res.send = originalSend;
    
    logger.info('HTTP Response', {
      timestamp: new Date().toISOString(),
      method,
      route,
      statusCode: res.statusCode,
      responseTime: Date.now() - req._startTime
    });
    
    return res.send(data);
  };
  
  req._startTime = Date.now();
  next();
};

module.exports = loggerMiddleware;