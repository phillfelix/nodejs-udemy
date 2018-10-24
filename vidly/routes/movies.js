const express = require('express')
const router = express.Router();
const { Movie, validate } = require('../models/Movie');
const { Genre } = require('../models/Genre');

router.get('/', async (req, res) => {
  const Movies = await Movie.find();
  res.send(Movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if(!movie) return res.status(404).send('Movie not found');

  res.send(movie);
});

router.post('/', async (req, res) => {
  try {
    const { error }= validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Genre does not exist');

    let movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre.id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    movie = await movie.save();

    res.send(movie);
  } catch(error) {
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { error } = await validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Genre does not exist');

    let movie = await Movie.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      genre: {
        _id: genre.id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    }, {new: true});
    if(!movie) return res.status(404).send('Movie not found');

    res.send(movie);
  } catch(error) {
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send('Movie not found');

    res.send(movie);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
