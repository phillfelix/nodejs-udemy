const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    match: /^[A-Z ]+$/i
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{5}$/
  },
  isGold: {
    type: Boolean,
    default: false
  }
}));

function validate(customer) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(5).max(5).required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

module.exports = { Customer, validate };
