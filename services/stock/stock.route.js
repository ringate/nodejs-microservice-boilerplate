const express = require('express');
const stockController = require('./stock');
const router = express.Router();

// assign controllers for each routing
router.get('/slot/:slotId', stockController.getSlot);
router.get('/item/:itemCode', stockController.getItem);
router.get('/price/:operator/:target', stockController.getByPrice);
router.get('/left', stockController.getAvailableStock);

module.exports = router;
