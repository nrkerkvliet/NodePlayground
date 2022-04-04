const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        maxlength: 50,
        requried: true
    }
}));

function validateCustomer(customer)
{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        isGold: Joi.bool(),
        phone: Joi.string().max(50).required()
    })

    const result = schema.validate(customer);
    return result;
}

exports.Customer = Customer;
exports.validate = validateCustomer;
