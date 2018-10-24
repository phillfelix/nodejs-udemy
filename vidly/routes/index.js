const express = require('express');
const router = express.Router();
const genres = require('./genres');
const customers = require('./customers');
const home = require('./home');
const movies = require('./movies');

router.use('/', home);
router.use('/api/genres', genres);
router.use('/api/customers', customers);
router.use('/api/movies', movies);

module.exports = router;
