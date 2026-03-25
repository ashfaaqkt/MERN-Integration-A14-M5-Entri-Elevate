const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        company: { type: String, required: true },
        status: { type: String, required: true, default: 'Active', enum: ['Active', 'Inactive', 'Lead'] }
    },
    { timestamps: true }
);

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
