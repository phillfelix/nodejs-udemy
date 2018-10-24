const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./Genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    default: 0,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 255
  }
}));

function validate(movie) {
  const schema = {
    title: Joi.string().min(2).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  };

  return Joi.validate(movie, schema);
}

module.exports = { Movie, validate };
