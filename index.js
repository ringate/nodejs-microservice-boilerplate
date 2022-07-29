// declare module
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const rfs = require('rotating-file-stream');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./mongo');
const logger = require('./logger').Logger;
require('dotenv').config();

// database init
db.open().then((result) => {
  logger.info({ message: 'MongoDB is connected.', result });
}).catch((error) => {
  logger.error({ message: 'MongoDB connection failed.', error });
});

// config and settings
const app = express();
const NODE_ENV = process.env.MODE || 'dev';
const SERVER_PORT = process.env.PORT || 5001;
logger.info(`Application Mode: ${chalk.green(NODE_ENV)}`);
const logformat = ':method :url :status :response-time ms - :res[content-length] [:date[iso]] :remote-addr';
const accessLogStream = rfs.createStream('access.log', {
  interval: '7d',
  path: path.join(__dirname, 'logs')
})
app.use(morgan(logformat, { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// assign express routers
const stockRouter = require('./services/stock/stock.route');
app.use('/stock', stockRouter);
const modemRouter = require('./services/modem/modem.route');
app.use('/modem', modemRouter);

// other express routers
app.get('/', (req, res) => res.send('OK'));
app.get('/ping', (req, res) => res.json({result:'pong'}));
app.get('/healthcheck', (req, res) => res.send('OK'));

// start express service
var server = app.listen(SERVER_PORT, () => {
  logger.info(`boilerplate API service port is ${chalk.green(SERVER_PORT)}`);
});

// close all services
const closeAll = () => {
  return new Promise((resolve, reject) => {
    try {
      logger.info('Closing MongoDB.');
      db.close().then((result) => {
        logger.info({ message: 'MongoDB is disconnected.', result });
      }).catch((error) => {
        logger.error({ message: 'MongoDB disconnect failed.', error });
      });
      logger.info('Closing ExpressJS.');
      server.close();
      resolve('OK');
    } catch(err) {
      reject(err);
    }
  });
}

process.on('SIGINT', () => {
  try {
    logger.info('Close services on app termination.');
    closeAll().then((result) => {
      logger.info({ message: 'All services were stopped.', result });
      process.exit(0);
    }).catch((error) => {
      logger.info({ message: 'Got error(s) when stopping services.', error });
      process.exit(0);
    });
  } catch (err) {
    logger.error({ error: err });
  }
});

module.exports = app;
