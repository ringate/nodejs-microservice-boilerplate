// declare module
import * as path from 'path';
import express from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
import * as rfs from 'rotating-file-stream';
import cors from 'cors';
import db from './mongo';
import logger from './logger';
import 'dotenv/config';

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

// database init
(async () => {
  logger.info('Connecting to MongoDB.');
  try {
    let result = await db.open();
    if (result == 'OK') {
      logger.info('MongoDB is connected.');
    } else {
      logger.error({ message: 'MongoDB connection failed.', result });
    }
  } catch (error) {
    logger.error({ message: 'MongoDB connection failed.', error });
  }
})();

// assign express routers
import { router as stockRouter } from './services/stock/stock.route';
app.use('/stock', stockRouter);
import { router as modemRouter } from './services/modem/modem.route';
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
const closeAll = async () => {
  console.log();
  logger.info('Close services on app termination.');
  try {
    logger.info('Closing MongoDB.');
    await db.close();
    logger.info('MongoDB is disconnected.');
    logger.info('Closing ExpressJS.');
    server.close();
    logger.info('All services were stopped.');
    process.exit(0);
  } catch(error) {
    logger.info({ message: 'Got error(s) when stopping services.', error });
    process.exit(1);
  }
}

process.on('SIGINT', closeAll);

module.exports = app;
