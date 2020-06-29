const moment = require('moment');
const logger = require('../../logger').Logger;
const MongoClient = require('mongodb').MongoClient;
const mongoOpts = { useUnifiedTopology: true };
const mongoUri = 'mongodb://localhost:27017';
const dbName = 'crudtest';
const colName = 'modemInfo';

var modemController = {};

modemController.create = (req, res) => {
  try {
    MongoClient.connect(mongoUri, mongoOpts, (err, client) => {
      if (err) {
        logger.error({ error: err });
        res.json({
          error: -2,
          message: 'MongoDB Create Error',
          detail: err
        });
      } else {
        const db = client.db(dbName);
        const data = req.body;
        db.collection(colName).insertOne(data, (err, doc) => {
          if (err) {
            logger.error({ error: err });
            res.json({
              error: -3,
              message: 'MongoDB Create [insert] Error',
              detail: err
            });
          } else {
            res.json({
              status: 'OK',
              datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
              result: doc.result,
              insertedCount: doc.insertedCount,
              insertedId: doc.insertedId,
              data: doc.ops
            });
          }
          client.close();
        });
      }
    });
  } catch(err) {
    logger.error('modemController.update error detected.');
    logger.error({ error: err });
    res.json({
      error: -1,
      message: 'Exception Error'
    });
  }
};

modemController.read = (req, res) => {
  try {
    res.json({});
  } catch(err) {
    logger.error('modemController.read error detected.');
    logger.error({ error: err });
    res.json({
      error: -1,
      message: 'Exception Error'
    });
  }
};

modemController.update = (req, res) => {
  try {
    res.json({});
  } catch(err) {
    logger.error('modemController.update error detected.');
    logger.error({ error: err });
    res.json({
      error: -1,
      message: 'Exception Error'
    });
  }
};

modemController.delete = (req, res) => {
  try {
    res.json({});
  } catch(err) {
    logger.error('modemController.delete error detected.');
    logger.error({ error: err });
    res.json({
      error: -1,
      message: 'Exception Error'
    });
  }
};

module.exports = modemController;