// declare module
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger').Logger;
const mongo = require('./mongo');
require('dotenv').config();

// config and settings
const app = express();
const NODE_ENV = process.env.MODE || 'dev';
const SERVER_PORT = process.env.PORT || 5001;
logger.info('Application Mode: ' + NODE_ENV);
const loglevel = 'dev';
const accessLogStream = rfs.createStream('access.log', {
  interval: '7d',
  path: path.join(__dirname, 'logs')
})
app.use(morgan(loglevel, { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// stock service
const stockRouter = require('./services/stock/stock.route');
app.use('/stock', stockRouter);

// modem service
const modemRouter = require('./services/modem/modem.route');
app.use('/modem', modemRouter);

// other express routers
app.get('/', (req, res) => res.send('OK'));

// start express service
var server = app.listen(SERVER_PORT, () => {
  logger.info(`boilerplate service API port is ${SERVER_PORT}`);
});

process.on('SIGINT', function() {
  mongo.close().then((result) => {
    logger.info('MongoDB was disconnected on app termination.');
    process.exit(0);
  }).catch((err) => {
    logger.error({ error: err });
  });
});

module.exports = app;