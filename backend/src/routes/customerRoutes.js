const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// GET http://localhost:3000/customers
router.get('/', customerController.getAllCustomers);

// GET http://localhost:3000/customers/:id
router.get('/:id', customerController.getCustomerById);

// POST http://localhost:3000/customers/:id/interaction
router.post('/:id/interaction', customerController.addInteraction);

module.exports = router;