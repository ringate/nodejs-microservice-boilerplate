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
          message: 'MongoDB Connection Error',
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
              message: 'MongoDB Create [insertOne] Error',
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
    if (typeof req.params.id !== 'undefined') {
      MongoClient.connect(mongoUri, mongoOpts, (err, client) => {
        if (err) {
          logger.error({ error: err });
          res.json({
            error: -2,
            message: 'MongoDB Connection Error',
            detail: err
          });
        } else {
          const db = client.db(dbName);
          const data = req.params;
          db.collection(colName).find(data).toArray((err, doc) => {
            if (err) {
              logger.error({ error: err });
              res.json({
                error: -3,
                message: 'MongoDB Read [find] Error',
                detail: err
              });
            } else {
              res.json({
                status: 'OK',
                datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
                data: doc
              });
            }
            client.close();
          });
        }
      });
    } else {
      res.json({
        error: -11,
        message: 'Missing Parameter(s)'
      });
    }
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
    if (typeof req.params.id !== 'undefined') {
      MongoClient.connect(mongoUri, mongoOpts, (err, client) => {
        if (err) {
          logger.error({ error: err });
          res.json({
            error: -2,
            message: 'MongoDB Connection Error',
            detail: err
          });
        } else {
          const db = client.db(dbName);
          const filter = req.params;
          const data = { $set: req.body };
          db.collection(colName).updateMany(filter, data, (err, doc) => {
            if (err) {
              logger.error({ error: err });
              res.json({
                error: -3,
                message: 'MongoDB Update [updateMany] Error',
                detail: err
              });
            } else {
              res.json({
                status: 'OK',
                datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
                result: doc.result,
                matchedCount: doc.matchedCount,
                modifiedCount: doc.modifiedCount,
                upsertedCount: doc.upsertedCount,
                upsertedId: doc.upsertedId
              });
            }
            client.close();
          });
        }
      });
    } else {
      res.json({
        error: -11,
        message: 'Missing Parameter(s)'
      });
    }
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
    if (typeof req.params.id !== 'undefined') {
      MongoClient.connect(mongoUri, mongoOpts, (err, client) => {
        if (err) {
          logger.error({ error: err });
          res.json({
            error: -2,
            message: 'MongoDB Connection Error',
            detail: err
          });
        } else {
          const db = client.db(dbName);
          const data = req.params;
          db.collection(colName).deleteMany(data, (err, doc) => {
            if (err) {
              logger.error({ error: err });
              res.json({
                error: -3,
                message: 'MongoDB Delete [deleteMany] Error',
                detail: err
              });
            } else {
              res.json({
                status: 'OK',
                datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
                result: doc.result,
                deletedCount: doc.deletedCount
              });
            }
            client.close();
          });
        }
      });
    } else {
      res.json({
        error: -11,
        message: 'Missing Parameter(s)'
      });
    }
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