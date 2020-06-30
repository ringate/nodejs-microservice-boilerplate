const moment = require('moment');
const logger = require('../../logger').Logger;
const errorStatus = require('../../data/error_response_code');
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
        errorHandler(res, -12, err);
      });
    }).catch((err) => {
      errorHandler(res, -11, err);
    });
  } catch(err) {
    errorHandler(res, -1, err);
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
          errorHandler(res, -13, err);
        });
      }).catch((err) => {
        errorHandler(res, -11, err);
      });
    } else {
      errorHandler(res, -2, err);
    }
  } catch(err) {
    errorHandler(res, -1, err);
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
          errorHandler(res, -14, err);
        });
      }).catch((err) => {
        errorHandler(res, -11, err);
      });
    } else {
      errorHandler(res, -2, err);
    }
  } catch(err) {
    errorHandler(res, -1, err);
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
          errorHandler(res, -15, err);
        });
      }).catch((err) => {
        errorHandler(res, -11, err);
      });
    } else {
      errorHandler(res, -2, err);
    }
  } catch(err) {
    errorHandler(res, -1, err);
  }
};

const errorHandler = (res, errno, errmsg) => {
  let err = {
    status: "ERROR",
    datetime: moment().format('YYYY-MM-DD HH:mm:ss')
  }
  if (typeof errno == 'undefined') {
    errno = -1;
  }
  errorinfo = errorStatus.find(error => error.code === errno);
  err = Object.assign({
    errno: errorinfo.code,
    message: errorinfo.message
  }, err);
  if (typeof errmsg != 'undefined') {
    err = Object.assign({
      detail: errmsg
    }, err);
  }
  logger.error({ error: err });
  res.json(err);
  return;
}

module.exports = modemController;