const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const genres = require('./genres');
const logger = require('./logger');
const auth = require('./auth');
const app = express();

// third party middlewares
app.use(helmet());
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// built in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// custom middlewares
app.use(logger);
app.use(auth);

// custom router
app.use(genres);

const port = process.env.PORT || 3000; // get port from environment
app.listen(port, () => console.log(`Vidly API listening on port ${port}`));