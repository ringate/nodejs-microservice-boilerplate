const express = require('express');
const modemController = require('./modem');
const router = express.Router();

// CRUD API
router.post('/', modemController.create);
router.get('/:id', modemController.read);
router.put('/:id', modemController.update);
router.delete('/:id', modemController.delete);

module.exports = { router };