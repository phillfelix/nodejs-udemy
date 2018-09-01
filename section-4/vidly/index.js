const express = require('express');
const helmet = require('helmet');
const genres = require('./genres');
const auth = require('./auth');
const logger = require('./logger');
const app = express();

// third party middlewares
app.use(helmet());

// built in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// custom middlewares
app.use(logger(app.get('env')));
app.use(auth);

// custom router
app.use(genres);

const port = process.env.PORT || 3000; // get port from environment
app.listen(port, () => console.log(`Vidly API listening on port ${port}`));