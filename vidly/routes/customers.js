const express = require('express')
const router = express.Router();
const { Customer, validate } = require('../models/Customer');

router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if(!customer) return res.status(404).send('Customer not found');

  res.send(customer);
});

router.post('/', async (req, res) => {
  try {
    const { error }= validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer(req.body);
    customer = await customer.save();

    res.send(customer);
  } catch(error) {
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { error } = await validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!customer) return res.status(404).send('Customer not found');

    res.send(customer);
  } catch(error) {
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send('Customer not found');

    res.send(customer);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
