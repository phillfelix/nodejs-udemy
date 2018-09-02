const config = require('config');
const express = require('express');
const helmet = require('helmet');
const genres = require('./genres');
const auth = require('./auth');
const logger = require('./logger');
const app = express();

console.log(config.get('name'));
console.log(config.get('mail.host'));

// third party middlewares
app.use(helmet());

// built in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// custom middlewares
app.use(logger());
app.use(auth);

// custom router
app.use(genres);

const port = config.get('port'); // get port from environment
app.listen(port, () => console.log(`Vidly API listening on port ${port}`));