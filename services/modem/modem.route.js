const express = require('express');
const modemController = require('./modem');
const router = express.Router();

// CRUD API
router.post('/', modemController.create);
router.get('/:id', modemController.read);
router.put('/', modemController.update);
router.delete('/', modemController.delete);

module.exports = router;