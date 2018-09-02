const config = require('config');
const express = require('express');
const helmet = require('helmet');
const debug = require('debug')('app:startup');
const genres = require('./genres');
const auth = require('./auth');
const logger = require('./logger');
const app = express();

debug(`Application: ${config.get('name')}`);
debug(`Mail host: ${config.get('mail.host')}`);

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

app.get('/', (req, res) => {
  res.render('index', { title: 'Home of Vidly', message: 'Wellcome to Vidly' });
});

// custom router
app.use(genres);

const port = config.get('port'); // get port from environment
app.listen(port, () => debug(`'${config.get('name')}' listening on port ${port}`));