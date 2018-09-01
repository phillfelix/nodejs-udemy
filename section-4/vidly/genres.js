const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genres = [
  { id: 0, name: "horror" },
  { id: 1, name: "action" },
  { id: 2, name: "fantasy" },
  { id: 3, name: "comedy" },
  { id: 4, name: "drama" },
  { id: 5, name: "thriller" }
];

let sequence = genres.length;
function nextSequence() {
  return sequence++;
}

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

router.get('/api/genres', (req, res) => {
  res.send(genres);
});

router.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found');

  res.send(genre);
});

router.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: nextSequence(),
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

router.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

module.exports = router;