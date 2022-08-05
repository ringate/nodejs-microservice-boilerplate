import moment from 'moment';
import logger from '../../logger';
import errorStatus from '../../../data/error_response_code';
import db from '../../mongo';
const colName = 'modemInfo';

var modemController = {};

modemController.create = async (req, res) => {
  try {
    await db.open();
  } catch (err) {
    errorHandler(res, -11, err);
  }
  try {
    const data = req.body;
    const doc = await db.insert(colName, data, {});
    res.json({
      status: 'OK',
      datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
      result: doc.result,
      insertedCount: doc.insertedCount,
      insertedId: doc.insertedId,
      data: doc.ops
    });
  } catch (err) {
    errorHandler(res, -12, err);
  }
};

modemController.read = async (req, res) => {
  if (typeof req.params.id == 'undefined') {
    errorHandler(res, -2);
  }
  try {
    await db.open();
  } catch (err) {
    errorHandler(res, -11, err);
  }
  try {
    const query = req.params;
    const doc = await db.select(colName, query, {});
    res.json({
      status: 'OK',
      datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
      data: doc
    });
  } catch (err) {
    errorHandler(res, -13, err);
  }
}

modemController.update = async (req, res) => {
  if (typeof req.params.id == 'undefined') {
    errorHandler(res, -2);
  }
  try {
    await db.open();
  } catch (err) {
    errorHandler(res, -11, err);
  }
  try {
    const filter = req.params;
    const data = { $set: req.body };
    const doc = await db.update(colName, filter, data);
    res.json({
      status: 'OK',
      datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
      result: doc.result,
      matchedCount: doc.matchedCount,
      modifiedCount: doc.modifiedCount,
      upsertedCount: doc.upsertedCount,
      upsertedId: doc.upsertedId
    });
  } catch (err) {
    errorHandler(res, -14, err);
  }
}

modemController.delete = async (req, res) => {
  if (typeof req.params.id == 'undefined') {
    errorHandler(res, -2);
  }
  try {
    await db.open();
  } catch (err) {
    errorHandler(res, -11, err);
  }
  try {
    const query = req.params;
    const doc = await db.remove(colName, query);
    res.json({
      status: 'OK',
      datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
      result: doc.result,
      deletedCount: doc.deletedCount
    });
  } catch (err) {
    errorHandler(res, -15, err);
  }
}

const errorHandler = (res, errno, errmsg) => {
  let err = {
    status: "ERROR",
    datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss')
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