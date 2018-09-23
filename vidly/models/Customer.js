const mongoose = require('mongoose');

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

module.exports = Customer;
