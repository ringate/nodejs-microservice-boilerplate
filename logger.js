const winston = require('winston');
const moment = require('moment-timezone');

const Logger = winston.createLogger({
  level: "verbose",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/system.log' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.Console({format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.simple(),
      winston.format.json(),
      winston.format.printf((info) => {
        const {
          timestamp, level, message, ...args
        } = info;

        const ts = moment(timestamp).tz('Asia/Hong_kong').format('M/D HH:mm:ss');
        return `${ts} - ${level}: ${message} ${Object.keys(args).length ? "\n" + JSON.stringify(args, null, 2) : ''}`;
      })
    )})
  ]
});

module.exports = {
  Logger
};
