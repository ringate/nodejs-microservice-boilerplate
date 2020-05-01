const winston = require('winston');

const Logger = winston.createLogger({
  level: "verbose",
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.simple(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/system.log' }),
    new winston.transports.Console()
  ]
});

module.exports = {
  Logger
};
