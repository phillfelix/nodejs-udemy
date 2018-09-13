const express = require('express');
const Joi = require('joi');
const router = express.Router();
const Genre = require('../models/Genre');

function nextSequence() {
  return sequence++;
}

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Genre not found');

    res.send(genre);
  } catch(err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre(req.body);
    const result = await genre.save();

    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    }, {new: true});

    if (!genre) return res.status(404).send('Genre not found');

    res.send(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id, {
      name: req.body.name
    });

    if (!genre) return res.status(404).send('Genre not found');

    res.send(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
