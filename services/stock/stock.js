const moment = require('moment');
const logger = require('../../logger').Logger;
const slotInfo = require('../../data/stock');

var stockController = {};

stockController.getSlot = (req, res) => {
  try {
    // remarks: data.slot in JSON is integer, req.params.slotId is string
    // because express request always return string
    // use 2 equals rather than 3 equals if compare with integer values
    let slotDetail = slotInfo.find(data => data.slot == req.params.slotId);

    // code sample for assign additional data into object
    Object.assign(slotDetail, {
      version: '1.0.0',
      datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss')
    });

    // return object as JSON format
    res.json(slotDetail);
  } catch(err) {
  	logger.error('stockController.getSlot error detected.');
    logger.error({ error: err });
    res.json({
      error: -1,
      message: 'Exception Error'
    });
  }
};

stockController.getItem = (req, res) => {
  try {
    // Array.find() returns the value of the first element in the array
    let slotDetail = slotInfo.find(data => data.item_code === req.params.itemCode);
    res.json(slotDetail);
  } catch(err) {
  	logger.error('stockController.getItem error detected.');
    logger.error({ error: err });
    res.json({
      error: -1,
      message: 'Exception Error'
    });
  }
};

stockController.getByPrice = (req, res) => {
  try {
    let slotDetail = [];
    // Array.filter() returns new array with all elements that match condition
    if (req.params.operator === 'gt') {
      // greater than
      slotDetail = slotInfo.filter(data => data.price >= req.params.target);
    } else if (req.params.operator === 'lt') {
      // less than
      slotDetail = slotInfo.filter(data => data.price <= req.params.target);
    } else if (req.params.operator === 'eq') {
      // equal to
      slotDetail = slotInfo.filter(data => data.price == req.params.target);
    } else {
      // unexpected value
    }
    let data = {
      status: 'OK',
      datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
      records: slotDetail.length,
      data: slotDetail
    }
    res.json(data);
  } catch(err) {
  	logger.error('stockController.getItem error detected.');
    logger.error({ error: err });
    res.json({
      error: -1,
      message: 'Exception Error'
    });
  }
};

const numify = n => isNaN(n) ? 0 : parseInt(n);
const reducer = (newStock, currentStocks) => numify(newStock) + numify(currentStocks);

stockController.getAvailableStock = (req, res) => {
  try {
    // using map & reduce for this case:
    // Array.map() for extract values by specific key name
    // Array.reduce() for accumulate values
    let stockList = slotInfo.map(data => data.stock);
    let availableStock = stockList.reduce(reducer);
    res.json({
      status: 'OK',
      datetime: moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss'),
      available: availableStock,
      stocklist: stockList
    });
  } catch(err) {
  	logger.error('stockController.getItem error detected.');
    logger.error({ error: err });
    res.json({
      error: -1,
      message: 'Exception Error'
    });
  }
};

module.exports = stockController;
