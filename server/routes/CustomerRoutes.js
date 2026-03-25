const express = require('express');
const router = express.Router();
const { getCustomers, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/CustomerController');
const { protect } = require('../middleware/Auth');

// All customer routes are protected
router.route('/').get(protect, getCustomers).post(protect, createCustomer);
router.route('/:id').put(protect, updateCustomer).delete(protect, deleteCustomer);

module.exports = router;
