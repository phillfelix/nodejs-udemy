const config = require('config');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const debug = require('debug')('app:startup');
const routes = require('./routes');
const auth = require('./middleware/auth');
const logger = require('./middleware/logger');
const app = express();

debug(`Application: ${config.get('name')}`);
debug(`Mail host: ${config.get('mail.host')}`);

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => debug('Connected to database'))
  .catch(err => debug('Could not connect to database:', err));
mongoose.set('useFindAndModify', false);

app.set('view engine', 'pug');
app.set('views', './views'); // default

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
app.use('/', routes);

const port = config.get('port'); // get port from environment
app.listen(port, () => debug(`'${config.get('name')}' listening on port ${port}`));
