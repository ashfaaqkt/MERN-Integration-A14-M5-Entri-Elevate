const Customer = require('../models/CustomerModel');

// @desc    Get all customers
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving customers.' });
    }
};

// @desc    Create a customer
const createCustomer = async (req, res) => {
    const { name, email, phone, company, status } = req.body;

    if (!name || !email || !phone || !company) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const customer = new Customer({
            name, email, phone, company, status: status || 'Active'
        });

        const createdCustomer = await customer.save();
        res.status(201).json(createdCustomer);
    } catch (error) {
        res.status(400).json({ message: 'Invalid customer data.' });
    }
};

// @desc    Update a customer
const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (customer) {
            customer.name = req.body.name || customer.name;
            customer.email = req.body.email || customer.email;
            customer.phone = req.body.phone || customer.phone;
            customer.company = req.body.company || customer.company;
            customer.status = req.body.status || customer.status;

            const updatedCustomer = await customer.save();
            res.json(updatedCustomer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating customer.' });
    }
};

// @desc    Delete a customer
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (customer) {
            await customer.deleteOne();
            res.json({ message: 'Customer removed' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer.' });
    }
};

module.exports = { getCustomers, createCustomer, updateCustomer, deleteCustomer };
