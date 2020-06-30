const moment = require('moment');
const logger = require('../../logger').Logger;
const db = require('../../mongo');
const colName = 'modemInfo';

var modemController = {};

modemController.create = (req, res) => {
  try {
    db.open().then((result) => {
      const data = req.body;
      db.insert(colName, data, {}).then((doc) => {
        res.json({
          status: 'OK',
          datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
          result: doc.result,
          insertedCount: doc.insertedCount,
          insertedId: doc.insertedId,
          data: doc.ops
        });
      }).catch((err) => {
        logger.error({ error: err });
        res.json({
          error: -3,
          message: 'MongoDB Create Error',
          detail: err
        });
      });
    }).catch((err) => {
      logger.error({ error: err });
      res.json({
        error: -2,
        message: 'MongoDB Connection Error',
        detail: err
      });
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
      db.open().then((result) => {
        const query = req.params;
        db.select(colName, query, {}).then((doc) => {
          res.json({
            status: 'OK',
            datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
            data: doc
          });
        }).catch((err) => {
          logger.error({ error: err });
          res.json({
            error: -3,
            message: 'MongoDB Read Error',
            detail: err
          });
        });
      }).catch((err) => {
        logger.error({ error: err });
        res.json({
          error: -2,
          message: 'MongoDB Connection Error',
          detail: err
        });
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
      db.open().then((result) => {
        const filter = req.params;
        const data = { $set: req.body };
        db.update(colName, filter, data).then((doc) => {
          res.json({
            status: 'OK',
            datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
            result: doc.result,
            matchedCount: doc.matchedCount,
            modifiedCount: doc.modifiedCount,
            upsertedCount: doc.upsertedCount,
            upsertedId: doc.upsertedId
          });
        }).catch((err) => {
          logger.error({ error: err });
          res.json({
            error: -3,
            message: 'MongoDB Update Error',
            detail: err
          });
        });
      }).catch((err) => {
        logger.error({ error: err });
        res.json({
          error: -2,
          message: 'MongoDB Connection Error',
          detail: err
        });
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
      db.open().then((result) => {
        const query = req.params;
        db.remove(colName, query).then((doc) => {
          res.json({
            status: 'OK',
            datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
            result: doc.result,
            deletedCount: doc.deletedCount
          });
        }).catch((err) => {
          logger.error({ error: err });
          res.json({
            error: -3,
            message: 'MongoDB Delete Error',
            detail: err
          });
        });
      }).catch((err) => {
        logger.error({ error: err });
        res.json({
          error: -2,
          message: 'MongoDB Connection Error',
          detail: err
        });
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